import type { NextApiRequest, NextApiResponse } from 'next';
import { CountryCode, LiabilitiesObject, Transaction } from 'plaid';
import { auth, firestore } from 'utils/firebase';
import plaidClient from 'utils/plaid';

type fundsObject = {
  item_id: string;
  access_token: string;
  transactions?: Transaction[];
  liabilities?: LiabilitiesObject;
  user_id: string;
  type: string;
};

const Endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  const { publicToken, mwAccessToken, fundingType, lastStep } = req.body;

  if (!mwAccessToken) {
    return res.status(401).json({ error: 'Please include id token' });
  }

  try {
    const { uid } = await auth.verifyIdToken(mwAccessToken);

    const plaidData = await plaidClient.itemPublicTokenExchange({
      client_id: process.env.PLAID_CLIENT_ID,
      secret: process.env.PLAID_SECRET,
      public_token: publicToken,
    });

    const item_id = plaidData.data.item_id;

    const accountsData = await plaidClient.accountsGet({
      access_token: plaidData.data.access_token,
    });
    const accounts = accountsData.data.accounts;

    const item = accountsData.data.item;

    const institutionData = await plaidClient.institutionsGetById({
      institution_id: item.institution_id,
      country_codes: [CountryCode.Us],
      options:{
        include_optional_metadata: true,
        include_auth_metadata: true,
        include_payment_initiation_metadata: true,
      }
    });

    let liabilities = null;
    if (fundingType === 'loan') {
      const liabilitiesData = await plaidClient.liabilitiesGet({
        access_token: plaidData.data.access_token,
      });

      liabilities = liabilitiesData.data.liabilities;
    }

    let objToSave: fundsObject = {
      item_id,
      access_token: plaidData.data.access_token,
      user_id: uid,
      type: fundingType,
    };

    firestore
      .collection('items')
      .doc(item_id)
      .set({
        ...objToSave,
        liabilities,
        accounts,
        institution: institutionData.data.institution,
        ...item,
      });

    const user = await firestore.collection('users').doc(uid).get();

    const items = user.data().items
      ? [...user.data().items, objToSave]
      : [objToSave];

    firestore.collection('users').doc(uid).update({ items });

    if (lastStep) {
      firestore.collection('users').doc(uid).update({ registered: true });
    }

    res.status(200).json({ message: 'Successfully saved' });
  } catch (error) {
    console.error({ error });
    return res.status(401).json({ error: error.message });
  }
};

export default Endpoint;
