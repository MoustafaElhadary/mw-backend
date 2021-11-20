/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { NextComponentType, NextPageContext } from 'next';
import { AppProps } from 'next/app';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { SWRConfig } from 'swr';

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
  return (
    <SWRConfig
      value={{
        // refreshInterval: 3000,
        fetcher: (url) => axios.get(url).then((res) => res.data),
      }}
    >
      <Component {...pageProps} />{' '}
    </SWRConfig>
  );
}

export default MyApp;
