/* eslint-disable react-hooks/exhaustive-deps */
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import axios from 'axios';
import fetch from 'isomorphic-fetch';
import { NextComponentType, NextPageContext } from 'next';
import { AppProps } from 'next/app';
import React, { ReactElement, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { setSession } from 'redux/authSlice';
import store, { useAppSelector } from 'redux/store';
import { setProfile } from 'redux/userSlice';
import { SWRConfig } from 'swr';
import { definitions } from 'types/supabase';
import { supabase } from 'utils/supabaseClient';
import '../styles/index.css';

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
  const session = useAppSelector((state) => state.auth.session);
  const dispatch = useDispatch();

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from<definitions['profiles']>('profiles')
        .select(`*`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        dispatch(setProfile(data));
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    dispatch(setSession(supabase.auth.session()));

    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
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
