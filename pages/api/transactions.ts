// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Transaction } from 'plaid';
import { auth, firestore } from 'utils/firebase';

const Endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  // const { uid } = req.body;
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
      .filter((loan) => loan.type === 'funding')
      .map((x) => x.item_id);

    let transactions: Transaction[] = [];

    for (let item of items) {
      const itemData = await firestore.collection('items').doc(item).get();
      const itemTransactions = itemData.data().transactions as Transaction[];
      if (itemTransactions) {
        transactions.push(...itemTransactions);
      }
    }

    res.status(200).json({
      transactions,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default Endpoint;
