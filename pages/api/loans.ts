// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { firestore, auth } from 'utils/firebase';

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
      .filter((loan) => loan.type === 'loan')
      .map((x) => x.item_id);

    let mortgages = [];
    let studentLoans = [];

    for (let item of items) {
      const itemData = await firestore.collection('items').doc(item).get();
      const liabilities = itemData.data().liabilities;
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

    res.status(200).json({
      mortgages,
      studentLoans,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default Endpoint;
