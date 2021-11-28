// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { auth, firestore } from 'utils/firebase';

const Endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  const { mwAccessToken } = req.body;

  console.log({ mwAccessToken });
  if (!mwAccessToken) {
    return res.status(401).json({ error: 'Please include id token' });
  }

  try {
    const { uid } = await auth.verifyIdToken(mwAccessToken);
    const profile = await firestore.collection('users').doc(uid).get();

    const data = profile.data();

    let accounts = [];
    let liabilities = [];

    for (const item of data.items) {
      const { item_id } = item;
      const { accounts: itemAccounts, liabilities: itemLiabilities,institution } = (
        await firestore.collection('items').doc(item_id).get()
      ).data();

      if (itemAccounts) {
        accounts.push(
          ...itemAccounts.map((account) => ({
            ...account,
            institution,
            item_id
          }))
        );
      }

      if (itemLiabilities) {
        liabilities.push(itemLiabilities);
      }
    }


    const response = {
      profile:data,
      accounts,
      liabilities,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

export default Endpoint;
