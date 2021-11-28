// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as admin from 'firebase-admin';
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AccountBase, Transaction } from 'plaid';
import { firestore } from 'utils/firebase';
import { roundup } from 'utils/helpers';
import plaidClient from 'utils/plaid';

const Endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log('Webhook received');

    const { webhook_type: webhookType } = req.body;

    const type = webhookType.toLowerCase();

    // There are five types of webhooks: AUTH, TRANSACTIONS, ITEM, INCOME, ASSETS, And LIABILITIES
    // @TODO implement handling for remaining webhook types.
    const webhookHandlerMap = {
      transactions: handleTransactionsWebhook,
      item: handleItemWebhook,
      liabilities: handleLiabilitiesWebhook,
    };
    const webhookHandler = webhookHandlerMap[type] || unhandledWebhook;
    webhookHandler(req);

    // console.log({ data });
    res.status(200).json({});
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error });
  }
};

export default Endpoint;

const handleTransactionsWebhook = async (req: NextApiRequest) => {
  try {
    console.log('Handling transactions webhook');
    const {
      webhook_code: webhookCode,
      item_id,
      new_transactions: newTransactions,
      removed_transactions: removedTransactions,
    } = req.body;

    console.log({
      webhookCode,
      item_id,
      newTransactions,
      removedTransactions,
    });

    console.log({ webhookCode });

    switch (webhookCode) {
      case 'INITIAL_UPDATE': {
        // Fired when an Item's initial transaction pull is completed.
        // Note: The default pull is 30 days.
        const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
        const endDate = moment().format('YYYY-MM-DD');
        await handleTransactionsUpdate(item_id, startDate, endDate);
        break;
      }
      case 'HISTORICAL_UPDATE': {
        // Fired when an Item's historical transaction pull is completed. Plaid fetches as much
        // data as is available from the financial institution.
        const startDate = moment().subtract(2, 'years').format('YYYY-MM-DD');
        const endDate = moment().format('YYYY-MM-DD');
        await handleTransactionsUpdate(item_id, startDate, endDate);
        break;
      }
      case 'DEFAULT_UPDATE': {
        // Fired when new transaction data is available as Plaid performs its regular updates of
        // the Item. Since transactions may take several days to post, we'll fetch 14 days worth of
        // transactions from Plaid and reconcile them with the transactions we already have stored.
        const startDate = moment().subtract(14, 'days').format('YYYY-MM-DD');
        const endDate = moment().format('YYYY-MM-DD');
        await handleTransactionsUpdate(item_id, startDate, endDate);
        break;
      }
      case 'TRANSACTIONS_REMOVED': {
        // Fired when posted transaction(s) for an Item are deleted. The deleted transaction IDs
        // are included in the webhook payload.
        await deleteTransactions(item_id, removedTransactions);
        break;
      }
      default:
        console.log(
          `UNHANDLED WEBHOOK: ${webhookCode}: unhandled webhook code received.`
        );
    }
  } catch (error) {
    console.error({ error });
  }
};

const handleItemWebhook = async (req: NextApiRequest) => {
  const {
    webhook_type: webhookType,
    webhook_code: webhookCode,
    item_id: item_id,
  } = req.body;
  console.log(
    `ITEM ${webhookType} WEBHOOK: ${webhookCode}: Plaid item id ${item_id}: unhandled webhook type received.`
  );
};

const handleLiabilitiesWebhook = async (req: NextApiRequest) => {
  const {
    webhook_type: webhookType,
    webhook_code: webhookCode,
    item_id: item_id,
  } = req.body;
  console.log(
    `Liabilities ${webhookType} WEBHOOK: ${webhookCode}: Plaid item id ${item_id}: unhandled webhook type received.`
  );
};

const unhandledWebhook = async (req: NextApiRequest) => {
  const {
    webhook_type: webhookType,
    webhook_code: webhookCode,
    item_id: item_id,
  } = req.body;
  console.log(
    `UNHANDLED ${webhookType} WEBHOOK: ${webhookCode}: Plaid item id ${item_id}: unhandled webhook type received.`
  );
};

const retrieveItemByItemId = async (itemId: string) => {
  console.log(`Retrieving item ${itemId} from firestore`);
  try {
    const item = await firestore.collection('items').doc(itemId).get();
    return item.data();
  } catch (error) {
    console.log('Error in retrieveItemByItemId');
    console.error({ error });
    throw error;
  }
};

const retrieveTransactionsInDateRange = async (
  item_id: string,
  startDate: string,
  endDate: string
) => {
  console.log(
    `Retrieving transactions for item ${item_id} between ${startDate} and ${endDate}`
  );
  try {
    const startDateTimeStamp = admin.firestore.Timestamp.fromDate(
      new Date(startDate)
    );
    const endDateTimeStamp = admin.firestore.Timestamp.fromDate(
      new Date(endDate)
    );
    const query = await firestore
      .collection(`items/${item_id}/transactions`)
      .where('date', '<=', startDateTimeStamp)
      .where('date', '>=', endDateTimeStamp)
      .get();
    return query.docs.map((doc) => doc.data());
  } catch (error) {
    console.log('Error in retrieveTransactionsInDateRange');
    console.error({ error });
    throw error;
  }
};

/**
 * Fetches transactions from the Plaid API for a given item.
 *
 * @param {string} item_id the Plaid ID for the item.
 * @param {string} startDate date string in the format 'YYYY-MM-DD'.
 * @param {string} endDate date string in the format 'YYYY-MM-DD'.
 * @returns {Object{}} an object containing transactions and accounts.
 */
const fetchTransactions = async (
  item_id: string,
  startDate: string,
  endDate: string
) => {
  console.log(
    `Fetching transactions for item ${item_id} between ${startDate} and ${endDate} from plaid`
  );

  // the transactions endpoint is paginated, so we may need to hit it multiple times to
  // retrieve all available transactions.

  try {
    // get the access token based on the plaid item id
    const item = await retrieveItemByItemId(item_id);
    const access_token = item.access_token;

    let offset = 0;
    let transactionsToFetch = true;
    let resultData: {
      transactions: Transaction[];
      accounts: AccountBase[];
      item: any;
    } = { transactions: [], accounts: [], item: null };
    const batchSize = 100;
    /* eslint-disable no-await-in-loop */
    while (transactionsToFetch) {
      // fetch the transactions
      const configs = {
        access_token,
        start_date: startDate,
        end_date: endDate,
        options: {
          count: batchSize,
          offset: offset,
        },
      };
      const response = await plaidClient.transactionsGet(configs);
      const transactions = response.data.transactions;
      const accounts = response.data.accounts;

      resultData = {
        transactions: [...resultData.transactions, ...transactions],
        accounts: accounts,
        item,
      };

      if (transactions.length === batchSize) {
        offset += batchSize;
      } else {
        transactionsToFetch = false;
      }
    }
    /* eslint-enable no-await-in-loop */
    return resultData;
  } catch (error) {
    console.log('Error in fetchTransactions');
    console.error(`Error fetching transactions: ${error.message}`, { error });
    return { transactions: [], accounts: [], item: null };
  }
};

/**
 * Handles the fetching and storing of new transactions in response to an update webhook.
 *
 * @param {string} item_id the Plaid ID for the item.
 * @param {string} startDate the earliest date to retrieve ('YYYY-MM-DD').
 * @param {string} endDate the latest date to retrieve ('YYYY-MM-DD').
 */
const handleTransactionsUpdate = async (
  item_id: string,
  startDate: string,
  endDate: string
) => {
  console.log(
    `Handling transactions update for item ${item_id} between ${startDate} and ${endDate}`
  );

  try {
    // Fetch new transactions from plaid api.
    const {
      transactions: incomingTransactions,
      accounts,
      item,
    } = await fetchTransactions(item_id, startDate, endDate);

    const existingAccounts = item.accounts;

    // Retrieve existing transactions from our db.
    const existingTransactions = (await retrieveTransactionsInDateRange(
      item_id,
      startDate,
      endDate
    )) as Transaction[];

    // Filter out accounts from existing accounts
    const accountsToSave = existingAccounts
      ? accounts.filter(
          (a) =>
            !existingAccounts.map((ea) => ea.account_id).includes(a.account_id)
        )
      : accounts;

    // Compare to find new transactions.
    const existingTransactionIds = existingTransactions.reduce(
      (idMap, { transaction_id: transactionId }) => ({
        ...idMap,
        [transactionId]: transactionId,
      }),
      {}
    );
    const transactionsToStore = incomingTransactions.filter(
      ({ transaction_id: transactionId }) => {
        const isExisting = existingTransactionIds[transactionId];
        return !isExisting;
      }
    );

    // Compare to find removed transactions (pending transactions that have posted or cancelled).
    const incomingTransactionIds = incomingTransactions.reduce(
      (idMap, { transaction_id: transactionId }) => ({
        ...idMap,
        [transactionId]: transactionId,
      }),
      {}
    );
    const transactionsToRemove = existingTransactions.filter(
      ({ transaction_id: transactionId }) => {
        const isIncoming = incomingTransactionIds[transactionId];
        return !isIncoming;
      }
    );

    // Update the DB.
    await createAccounts(item_id, accountsToSave);
    await createTransactions(item_id, transactionsToStore);
    await deleteTransactions(item_id, transactionsToRemove);
  } catch (error) {
    console.log('Error in handleTransactionsUpdate');
    console.error(`Error handling transactions update: ${error.message}`, {
      error,
    });
    throw error;
  }
};

const createAccounts = async (item_id: string, accounts: AccountBase[]) => {
  console.log(`Creating ${accounts.length} accounts for item ${item_id}`);

  try {
    const item = await firestore.collection('items').doc(item_id).get();

    const accountsToSave = item.data().accounts
      ? [...item.data().accounts, ...accounts]
      : accounts;

    firestore
      .collection('items')
      .doc(item_id)
      .update({ accounts: accountsToSave });
  } catch (error) {
    console.log('Error in createAccounts');
    console.error({ error });
    throw error;
  }
};

const createTransactions = async (
  item_id: string,
  transactions: Transaction[]
) => {
  console.log(
    `Creating ${transactions.length} transactions for item ${item_id}`
  );

  try {
    const item = (
      await firestore.collection('items').doc(item_id).get()
    ).data();

    const userDoc = await firestore.collection('users').doc(item.user_id).get();
    const user = userDoc.data();

    const transactionsToSave: Transaction[] = item.transactions
      ? [...item.transactions, ...transactions]
      : transactions;

    // add transaction to list of transactions under items
    firestore
      .collection('items')
      .doc(item_id)
      .update({ transactions: transactionsToSave });

    const roundups = user.roundups;

    //TODO: Filter out transactions that are 60 days or more
    const transactionsToSaveWithRoundups = transactionsToSave.filter(
      (transaction) => {
        const transactionDate = new Date(transaction.date);
        const now = new Date();
        const difference = now.getTime() - transactionDate.getTime();
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        return days < 60;
      }
    );
    // add transaction to upcoming users roundups
    firestore
      .collection('users')
      .doc(userDoc.id)
      .update({
        roundups: {
          ...roundups,
          upcoming: [
            ...roundups.upcoming,
            ...transactionsToSaveWithRoundups.map(
              (transaction) => transaction.transaction_id
            ),
          ],
        },
      });

    // add transaction to past roundups collection
    for (const transaction of transactionsToSaveWithRoundups) {
      await firestore
        .collection('roundups')
        .doc(transaction.transaction_id)
        .set({
          transactionAmount: transaction.amount,
          transactionRoundupAmount: roundup(transaction.amount),
          transactionId: transaction.transaction_id,
          user_id: userDoc.id,
          payment_id: null,
          item_id,
          dateCreated: admin.firestore.Timestamp.now(),
          transaction,
        });
    }
  } catch (error) {
    console.log('Error in createTransactions');
    console.error({ error });
    throw error;
  }
};

const deleteTransactions = async (
  item_id: string,
  transactions: Transaction[]
) => {
  console.log(
    `Deleting ${transactions.length} transactions for item ${item_id}`
  );

  try {
    const item = (
      await firestore.collection('items').doc(item_id).get()
    ).data();

    const userDoc = await firestore.collection('users').doc(item.user_id).get();
    const user = userDoc.data();
    // array which holds all values
    const transactionsArr: Transaction[] = item.transactions;

    if (transactionsArr) {
      // array of values that needs to be deleted
      const transactionsToDeleteArr = transactions;

      // make a Set to hold values from transactionsToDeleteArr
      const transactionsToDeleteSet = new Set(transactionsToDeleteArr);

      // use filter() method
      // to filter only those elements
      // that need not to be deleted from the array
      const newArr = transactionsArr.filter((name) => {
        // return those elements not in the transactionsToDeleteSet
        return !transactionsToDeleteSet.has(name);
      });

      firestore
        .collection('items')
        .doc(item_id)
        .update({ transactions: newArr });

      // delete transactions from roundups collection
      for (const transaction of transactions) {
        await firestore
          .collection('roundups')
          .doc(transaction.transaction_id)
          .delete();
      }

      //delete transactions from upcoming roundups for user

      const roundups: string[] = user.roundups.upcoming.filter(
        (transactionId) =>
          !transactions.map((t) => t.transaction_id).includes(transactionId)
      );
      await firestore
        .collection('users')
        .doc(userDoc.id)
        .update({
          roundups: {
            ...user.roundups,
            upcoming: roundups,
          },
        });
    }
  } catch (error) {
    console.log('Error in deleteTransactions');
    console.error({ error });
    throw error;
  }
};
