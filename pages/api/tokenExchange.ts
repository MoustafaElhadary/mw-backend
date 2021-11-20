// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import plaidClient from 'utils/plaid';
import { AccountBase, Transaction, LiabilitiesObject } from 'plaid';

import { auth, firestore } from 'utils/firebase';
import moment from 'moment';

type fundsObject = {
  item_id: string;
  access_token: string;
  accounts: AccountBase[];
  transactions?: Transaction[];
  liabilities?: LiabilitiesObject;
  registered?: Boolean;
};

const Endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Starting Token exchange');
  const { publicToken, mwAccessToken, fundingType, lastStep } = req.body;

  console.log({ publicToken, mwAccessToken, fundingType, lastStep });
  if (!mwAccessToken) {
    return res.status(401).json({ error: 'Please include id token' });
  }

  try {
    const data = await auth.verifyIdToken(mwAccessToken);
    console.log('Access Granted');
    console.log({ data });

    const plaidData = await plaidClient.itemPublicTokenExchange({
      client_id: process.env.PLAID_CLIENT_ID,
      secret: process.env.PLAID_SECRET,
      public_token: publicToken,
    });

    const accountData = await plaidClient.accountsGet({
      access_token: plaidData.data.access_token,
    });

    console.log('Account Data');
    console.log({ accountData });
    let objToSave: fundsObject = {
      item_id: plaidData.data.item_id,
      access_token: plaidData.data.access_token,
      accounts: accountData.data.accounts,
    };

    if (fundingType === 'funding') {
      console.log('Transactions Data');
      const transactionsData = await plaidClient.transactionsGet({
        access_token: plaidData.data.access_token,
        start_date: moment().subtract(30, 'days').format('YYYY-MM-DD'),
        end_date: moment().format('YYYY-MM-DD'),
      });

      console.log({
        transactionsData,
        start_date: moment().subtract(30, 'days').format('YYYY-MM-DD'),
        end_date: moment().format('YYYY-MM-DD'),
      });

      objToSave = {
        ...objToSave,
        transactions: transactionsData.data.transactions,
      };
    }

    if (fundingType === 'loan') {
      console.log('liabilities Data');

      const liabilitiesData = await plaidClient.liabilitiesGet({
        access_token: plaidData.data.access_token,
      });

      objToSave = {
        ...objToSave,
        liabilities: liabilitiesData.data.liabilities,
      };
    }

    if (lastStep) {
      objToSave = {
        ...objToSave,
        registered: true,
      };
    }
    firestore
      .collection('users')
      .doc(data.uid)
      .collection(fundingType)
      .doc(plaidData.data.access_token)
      .set(objToSave);

    console.log({ data });

    res.status(200).json({ x: 2 });
  } catch (error) {
    console.log({ error });
    return res.status(401).json({ error: error.message });
  }
};

export default Endpoint;
