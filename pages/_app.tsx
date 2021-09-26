import axios from 'axios';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import fetch from 'isomorphic-fetch';
import { AppProps } from 'next/app';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { SWRConfig } from 'swr';
import '../styles/index.css';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: `https://${process.env.NEXT_PUBLIC_STORE}.myshopify.com/api/2021-07/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token':process.env.NEXT_PUBLIC_TOKEN,
      Accept: 'application/graphql',
    },
    fetch,
  }),
});

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <SWRConfig
          value={
            {
              // refreshInterval: 3000,
              fetcher: (url) => axios.get(url).then((res) => res.data),
            }
          }
        >
          <Component {...pageProps} />{' '}
        </SWRConfig>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
