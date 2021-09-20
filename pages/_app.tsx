import React, { ReactElement } from 'react';
import { SWRConfig } from 'swr';
// import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
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
