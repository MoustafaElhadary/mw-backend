// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  AccountSubtype,
  CountryCode,
  LinkTokenCreateRequest,
  Products,
} from 'plaid';
import plaidClient from 'utils/plaid';

const Endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log('Starting token creation');
    const { fundingType } = req.body;

    let config: LinkTokenCreateRequest = {
      user: {
        client_user_id: 'MW-Backend',
      },
      client_name: 'MochaWallet',
      products: [Products.Transactions, Products.Auth],
      country_codes: [CountryCode.Us],
      language: 'en',
      webhook: `${process.env.BASE_URL}/api/webhooks/plaid`,
    };

    if (fundingType === 'loan') {
      config = {
        ...config,
        products: [Products.Auth, Products.Liabilities],
        account_filters: {
          loan: {
            account_subtypes: [AccountSubtype.Student, AccountSubtype.Mortgage],
          },
        },
      };
    }

    const data = await plaidClient.linkTokenCreate(config);

    console.log({ data });
    res.status(200).json({ linkToken: data.data.link_token });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

export default Endpoint;
