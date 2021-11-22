// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { firestore, auth } from 'utils/firebase';

const Endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  const {  mwAccessToken } = req.body;

  console.log({  mwAccessToken });
  if (!mwAccessToken) {
    return res.status(401).json({ error: 'Please include id token' });
  }

  let data = {};
  try {
    const { uid } = await auth.verifyIdToken(mwAccessToken);
    const profile = await firestore.collection('users').doc(uid).get();

    data = profile.data();

    const subCollections = await firestore
      .collection('users')
      .doc(uid)
      .listCollections();

    for (const subCollection of subCollections) {
      const sb = await subCollection.get();

      let arr = [];
      for (const doc of sb.docs) {
        arr = [...arr, { [doc.id]: doc.data() }];
      }
      data = {
        ...data,
        [subCollection.id]: [...arr],
      };
    }

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default Endpoint;
