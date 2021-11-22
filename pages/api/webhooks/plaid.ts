// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment';
import { firestore } from 'utils/firebase';
import plaidClient from 'utils/plaid';
import * as admin from 'firebase-admin';

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
    console.log({ error });
    res.status(500).json({ error });
  }
};

export default Endpoint;

const handleTransactionsWebhook = async (req) => {
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
};

const handleItemWebhook = async (req) => {
  console.log('Handling item webhook');
};

const handleLiabilitiesWebhook = async (req) => {
  console.log('Handling liabilities webhook');
};

const unhandledWebhook = (req) => {
  const {
    webhook_type: webhookType,
    webhook_code: webhookCode,
    item_id: item_id,
  } = req;
  console.log(
    `UNHANDLED ${webhookType} WEBHOOK: ${webhookCode}: Plaid item id ${item_id}: unhandled webhook type received.`
  );
};

const retrieveItemByItemId = async (itemId: string) => {
  const item = await firestore.collection('items').doc(itemId).get();
  return item.data();
};

const retrieveTransactionsInDateRange = async (
  item_id: string,
  startDate: string,
  endDate: string
) => {
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
};

/**
 * Fetches transactions from the Plaid API for a given item.
 *
 * @param {string} item_id the Plaid ID for the item.
 * @param {string} startDate date string in the format 'YYYY-MM-DD'.
 * @param {string} endDate date string in the format 'YYYY-MM-DD'.
 * @returns {Object{}} an object containing transactions and accounts.
 */
const fetchTransactions = async (item_id, startDate, endDate) => {
  // the transactions endpoint is paginated, so we may need to hit it multiple times to
  // retrieve all available transactions.

  try {
    // get the access token based on the plaid item id
    const { access_token } = await retrieveItemByItemId(item_id);

    let offset = 0;
    let transactionsToFetch = true;
    let resultData = { transactions: [], accounts: [] };
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
        accounts,
      };

      if (transactions.length === batchSize) {
        offset += batchSize;
      } else {
        transactionsToFetch = false;
      }
    }
    /* eslint-enable no-await-in-loop */
    return resultData;
  } catch (err) {
    console.error(`Error fetching transactions: ${err.message}`);
    return { transactions: [], accounts: [] };
  }
};

/**
 * Handles the fetching and storing of new transactions in response to an update webhook.
 *
 * @param {string} item_id the Plaid ID for the item.
 * @param {string} startDate the earliest date to retrieve ('YYYY-MM-DD').
 * @param {string} endDate the latest date to retrieve ('YYYY-MM-DD').
 */
const handleTransactionsUpdate = async (item_id, startDate, endDate) => {
  // Fetch new transactions from plaid api.
  const { transactions: incomingTransactions, accounts } =
    await fetchTransactions(item_id, startDate, endDate);

  // Retrieve existing transactions from our db.
  const existingTransactions = await retrieveTransactionsInDateRange(
    item_id,
    startDate,
    endDate
  );

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
  await createAccounts(item_id, accounts);
  await createTransactions(item_id, transactionsToStore);
  await deleteTransactions(item_id, transactionsToRemove);
};

const createAccounts = async (item_id: string, accounts: any[]) => {
  const item = await firestore.collection('items').doc(item_id).get();

  const accountsToSave = item.data().accounts
    ? [...item.data().accounts, ...accounts]
    : accounts;

  firestore
    .collection('items')
    .doc(item_id)
    .update({ accounts: accountsToSave });
};

const createTransactions = async (item_id: string, transactions: any[]) => {
  const item = await firestore.collection('items').doc(item_id).get();

  const transactionsToSave = item.data().transactions
    ? [...item.data().transactions, ...transactions]
    : transactions;

  firestore
    .collection('items')
    .doc(item_id)
    .update({ transactions: transactionsToSave });
};

const deleteTransactions = async (item_id: string, transactions: any[]) => {
  const item = await firestore.collection('items').doc(item_id).get();

  // array which holds all values
  const transactionsArr = item.data().transactions;

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

    firestore.collection('items').doc(item_id).update({ transactions: newArr });
  }
};
