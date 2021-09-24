import axios from 'axios';
// import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import React, { ReactElement } from 'react';
// import { UserProvider } from 'hooks/context/auth';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { SWRConfig } from 'swr';
// import 'tailwindcss/tailwind.css';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Provider store={store}>
      <SWRConfig
        value={{
          // refreshInterval: 3000,
          fetcher: (url) => axios.get(url).then((res) => res.data),
        }}
      >
        <Component {...pageProps} />{' '}
      </SWRConfig>
    </Provider>
  );
}

export default MyApp;
