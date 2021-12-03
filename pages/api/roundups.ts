// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getContentById } from 'utils/db';
import { auth, firestore } from 'utils/firebase';
import { getNextMonday } from 'utils/helpers';

const Endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  const { mwAccessToken } = req.body;

  console.log({ mwAccessToken });
  if (!mwAccessToken) {
    return res.status(401).json({ error: 'Please include id token' });
  }

  try {
    const { uid } = await auth.verifyIdToken(mwAccessToken);
    const profile = await firestore.collection('users').doc(uid).get();

    let user = profile.data();

    const previous: string[] = user.roundups.previous;
    const upcoming: string[] = user.roundups.upcoming;

    console.log({ length: upcoming.length });
    const previousDocs = (await getContentById(previous, 'roundups')).sort(
      (a, b) =>
        new Date(b.transaction.date).valueOf() -
        new Date(a.transaction.date).valueOf()
    );
    const upcomingDocs = (await getContentById(upcoming, 'roundups')).sort(
      (a, b) =>
        new Date(b.transaction.date).valueOf() -
        new Date(a.transaction.date).valueOf()
    );

    const nextPaymentDate = getNextMonday();

    const upcomingDepositTotal = Math.abs(
      upcomingDocs?.reduce(
        (acc, curr) => acc + curr.transactionRoundupAmount,
        0
      )
    );

    const allTimeTotal = Math.abs(
      upcomingDocs?.reduce(
        (acc, curr) => acc + curr.transactionRoundupAmount,
        0
      ) +
        previousDocs?.reduce(
          (acc, curr) => acc + curr.transactionRoundupAmount,
          0
        )
    );

    const earliestUpcomingPaymentDate =
      upcomingDocs?.slice(-1)[0].transaction.date;

    const response = {
      upcoming: upcomingDocs,
      previous: previousDocs,
      nextPaymentDate,
      upcomingDepositTotal,
      allTimeTotal,
      earliestUpcomingPaymentDate,
    };

    console.log({ nextPaymentDate,
      upcomingDepositTotal,
      allTimeTotal,
      earliestUpcomingPaymentDate,})

    res.status(200).json(response);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error });
  }
};

export default Endpoint;
