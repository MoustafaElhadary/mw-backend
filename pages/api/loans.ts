// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  AccountBase,
  LiabilitiesObject,
  MortgageLiability,
  StudentLoan,
} from 'plaid';
import { auth, firestore } from 'utils/firebase';
import { onlyUnique } from 'utils/helpers';
import plaidClient from 'utils/plaid';

const Endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  const { mwAccessToken } = req.body;

  console.log({ mwAccessToken });
  if (!mwAccessToken) {
    return res.status(401).json({ error: 'Please include id token' });
  }

  try {
    const { uid } = await auth.verifyIdToken(mwAccessToken);
    const profile = await firestore.collection('users').doc(uid).get();

    let user = profile.data();

    const items = user.items
      .filter((loan) => loan.type === 'loan')
      .map((x) => x.item_id);

    let mortgages: MortgageLiability[] = [];
    let studentLoans: StudentLoan[] = [];

    let accounts: AccountBase[] = [];

    for (let item of items) {
      const itemData = await firestore.collection('items').doc(item).get();
      const liabilities: LiabilitiesObject = itemData.data().liabilities;

      const accountData = await plaidClient.accountsGet({
        access_token: itemData.data().access_token,
      });

      accounts = [...accounts, ...accountData.data.accounts];

      if (liabilities) {
        const { mortgage, student } = liabilities;
        if (mortgage) {
          mortgages.push(...mortgage);
        }
        if (student) {
          studentLoans.push(...student);
        }
      }
    }

    const studentLoanIds = studentLoans
      .map((loan) => loan.account_id)
      .filter(onlyUnique);

    const studentLoanAccounts = accounts.filter((account) =>
      studentLoanIds.includes(account.account_id)
    );

    const studentLoanBalance = studentLoanAccounts.reduce(
      (acc, curr) => acc + curr.balances.current,
      0
    );

    const studentLoanAverageInterestRate =
      studentLoans.reduce((acc, curr) => {
        const interest_rate_percentage = curr.interest_rate_percentage || 3;
        const balance = studentLoanAccounts.find(
          (account) => account.account_id === curr.account_id
        ).balances.current;
        return acc + balance * interest_rate_percentage;
      }, 0) / studentLoanBalance;

    const mortgagesIds = mortgages
      .map((loan) => loan.account_id)
      .filter(onlyUnique);

    const mortgagesAccounts = accounts.filter((account) =>
      mortgagesIds.includes(account.account_id)
    );

    const mortgagesBalance = mortgagesAccounts.reduce(
      (acc, curr) => acc + curr.balances.current,
      0
    );

    const mortgagesAverageInterestRate =
      mortgages.reduce((acc, curr) => {
        const interest_rate_percentage = curr.interest_rate.percentage || 3;
        const balance = mortgagesAccounts.find(
          (account) => account.account_id === curr.account_id
        ).balances.current;
        return acc + balance * interest_rate_percentage;
      }, 0) / mortgagesBalance;

    const response = {
      student: {
        loans: studentLoans,
        averageInterestRate: studentLoanAverageInterestRate,
        balance: studentLoanBalance,
        accounts: studentLoanAccounts,
      },
      mortgages: {
        loans: mortgages,
        averageInterestRate: mortgagesAverageInterestRate,
        balance: mortgagesBalance,
        accounts: mortgagesAccounts,
      },
      totalOriginalAmount:
        studentLoans
          .map((loan) => loan.origination_principal_amount)
          .reduce((acc, curr) => acc + curr, 0) +
        mortgages
          .map((loan) => loan.origination_principal_amount)
          .reduce((acc, curr) => acc + curr, 0),
      amountLeft: studentLoanBalance + mortgagesBalance,
      

      
    };
    console.log(response);

    res.status(200).json(response);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

export default Endpoint;
