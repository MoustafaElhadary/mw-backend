// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { CountryCode, Products } from 'plaid';
import plaidClient from 'utils/plaid';

const Endpoint = async (_: NextApiRequest, res: NextApiResponse) => {
  // const {  fundingType } = req.body;

  const products = [
    Products.Transactions,
    Products.Auth,
    Products.Liabilities
  ]

  // if(fundingType === 'loan') {
  //   products.push();
  // }
    

  const data = await plaidClient.linkTokenCreate({
    user: {
      client_user_id: 'MW-Backend',
    },
    client_name: 'MochaWallet',
    products,
    country_codes: [CountryCode.Us],
    language: 'en',
  });

  console.log({ data });
  res.status(200).json({ linkToken: data.data.link_token });
};

export default Endpoint;
