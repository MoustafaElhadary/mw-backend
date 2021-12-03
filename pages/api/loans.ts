// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AccountBase, LiabilitiesObject, StudentLoan } from 'plaid';
import { DEFAULT_STUDENT_LOAN_INTERESt_RATE } from 'utils/const';
import { auth, firestore } from 'utils/firebase';
import { onlyUnique } from 'utils/helpers';
import plaidClient from 'utils/plaid';

type responseType = {
  loans: StudentLoan[];
  accounts: AccountBase[];
  balance: number;
  loanTerm: {
    initial: number;
    current: number;
  };
  monthlyPayment: {
    initial: number;
    current: number;
    breakdown: {
      minimum: number;
      extra: number;
      familyMatch: number;
      employerMatch: number;
    };
  };
  interest: {
    apr: number,
    initial: number,
    current: number,
    interestSavings: number,
    timeSavedString: string,
  },
};

const Endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  const { mwAccessToken } = req.body;

  console.log({ mwAccessToken });
  if (!mwAccessToken) {
    return res.status(401).json({ error: 'Please include id token' });
  }

  try {
    const { studentLoans, accounts } = await fetchStudentLoans(mwAccessToken);

    const {
      studentLoanAverageInterestRate,
      studentLoanBalance,
      studentLoanAccounts,
    } = getStudentLoanInfo(studentLoans, accounts);

    //Calculate loan term in months
    //TODO: On sign up save start date and end date and use them here instead of today
    const loanTermInMonths = moment(
      new Date(
        studentLoans[0].loan_status.end_date ||
          studentLoans[0].expected_payoff_date
      )
    ).diff(new Date(), 'month', true);

    const monthlyInterest = studentLoanAverageInterestRate / 100 / 12;

    // formula to calculate monthly payment is MonthlyPayment = (LoanAmount * MonthlyInterestRate) / (1 - (1 + MonthlyInterestRate)^(-LoanTermInMonths))
    const monthlyPayment =
      (monthlyInterest * studentLoanBalance) /
      (1 - Math.pow(1 + monthlyInterest, -1 * loanTermInMonths));

    //TODO: fetch from DB (this should be calculated on load addition)
    const initialAssumedInterestPaid =
      monthlyPayment * loanTermInMonths - studentLoanBalance;

    //TODO: fetch monthly extra payments from DB (average roundups from last month + employer match + family match)
    //calculate number of payments with extra payments
    const newPayment = monthlyPayment + 200;

    // formula to calculate new number of months after extra payments is numberOfMonths = (-1 * log(1 - (monthly interest * LoanAmount) / newPayment )) / log(1 + MonthlyInterestRate)
    const newLoanTermInMonths =
      (-1 * Math.log(1 - (monthlyInterest * studentLoanBalance) / newPayment)) /
      Math.log(1 + monthlyInterest);

    const newAssumedInterestPaid =
      newPayment * newLoanTermInMonths - studentLoanBalance;

    const interestSavings = initialAssumedInterestPaid - newAssumedInterestPaid;

    const monthsSaved = loanTermInMonths - newLoanTermInMonths;

    var duration = moment.duration(monthsSaved, 'months');

    const timeSavedString = `${duration.years()} years, ${Math.round(
      duration.months()
    )} months`;
    

    const response: responseType = {
      loans: studentLoans,
      accounts: studentLoanAccounts,
      balance: studentLoanBalance,
      loanTerm: {
        initial: loanTermInMonths,
        current: newLoanTermInMonths,
      },
      monthlyPayment: {
        initial: monthlyPayment,
        current: newPayment,
        breakdown: {
          minimum: monthlyPayment,
          extra: 200, //TODO: fetch from DB
          familyMatch: 0, //TODO: fetch from DB
          employerMatch: 0, //TODO: fetch from DB
        },
      },
      interest: {
        apr: studentLoanAverageInterestRate,
        initial: initialAssumedInterestPaid,
        current: newAssumedInterestPaid,
        interestSavings,
        timeSavedString,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error });
  }
};

const fetchStudentLoans = async (
  mwAccessToken: string
): Promise<{ studentLoans: StudentLoan[]; accounts: AccountBase[] }> => {
  const { uid } = await auth.verifyIdToken(mwAccessToken);
  const user = (await firestore.collection('users').doc(uid).get()).data();

  const items = user.items
    .filter((loan) => loan.type === 'loan')
    .map((x) => x.item_id);

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
      const { student } = liabilities;
      if (student) {
        studentLoans.push(...student);
      }
    }
  }

  return { studentLoans, accounts };
};

const getStudentLoanInfo = (
  studentLoans: StudentLoan[],
  accounts: AccountBase[]
): {
  studentLoanAverageInterestRate: number;
  studentLoanBalance: number;
  studentLoanAccounts: AccountBase[];
} => {
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
      const interest_rate_percentage =
        curr.interest_rate_percentage || DEFAULT_STUDENT_LOAN_INTERESt_RATE;
      const balance = studentLoanAccounts.find(
        (account) => account.account_id === curr.account_id
      ).balances.current;
      return acc + balance * interest_rate_percentage;
    }, 0) / studentLoanBalance;

  return {
    studentLoanAverageInterestRate,
    studentLoanBalance,
    studentLoanAccounts,
  };
};

export default Endpoint;
