// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {
    CountryCode
} from 'plaid';
import plaidClient from 'utils/plaid';
const Endpoint = async (_: NextApiRequest, res: NextApiResponse) => {
  // const origination_date = '2002-08-28';
  // const origination_principal_amount = 25000;
  // const end_date = '2032-07-28';
  // const interest_rate_percentage = 5.25;

  const accountData = await plaidClient.accountsGet({
    access_token: 'access-sandbox-ac61d9a5-729a-49f6-9b55-38c9af83529a',
  });

  const institutionData = await plaidClient.institutionsGetById({
      institution_id: 'ins_13',
      country_codes: [CountryCode.Us],

    //   client_id: process.env.PLAID_CLIENT_ID,
    //   secret: process.env.PLAID_SECRET,
    });

//   const authData = await plaidClient.authGet({
//     access_token: 'access-sandbox-ac61d9a5-729a-49f6-9b55-38c9af83529a',
//   });

  try {
    res.status(200).json({
      account: accountData.data,
        institution: institutionData.data,
    //   auth: authData.data,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default Endpoint;
