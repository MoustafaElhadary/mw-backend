import axios from 'axios';
// import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import React, { ReactElement } from 'react';
import { SWRConfig } from 'swr';
// import 'tailwindcss/tailwind.css';
import '../styles/index.css';
// import { UserProvider } from 'hooks/context/auth';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
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
