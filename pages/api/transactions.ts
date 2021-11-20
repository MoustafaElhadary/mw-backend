// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const Endpoint = async (_: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({
        message: 'This endpoint is not yet implemented.',
    });
};

export default Endpoint;
