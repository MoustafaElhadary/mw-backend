import axios from 'axios';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import fetch from 'isomorphic-fetch';
import { AppProps } from 'next/app';
import React, { ReactElement, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from 'redux/store';
import { SWRConfig } from 'swr';
import '../styles/index.css';
import { setSession } from 'redux/authSlice';
import { supabase } from 'utils/supabaseClient';
import { NextComponentType, NextPageContext } from 'next';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: `https://${process.env.NEXT_PUBLIC_STORE}.myshopify.com/api/2021-07/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_TOKEN,
      Accept: 'application/graphql',
    },
    fetch,
  }),
});

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Provider store={store}>
      <AppWrapper Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

function AppWrapper({
  Component,
  pageProps,
}: {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}): ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSession(supabase.auth.session()));

    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
      console.log('hello world');
      console.log({ session });
    });
  }, []);
  return (
    <ApolloProvider client={apolloClient}>
      <SWRConfig
        value={{
          // refreshInterval: 3000,
          fetcher: (url) => axios.get(url).then((res) => res.data),
        }}
      >
        <Component {...pageProps} />{' '}
      </SWRConfig>
    </ApolloProvider>
  );
}

export default MyApp;
