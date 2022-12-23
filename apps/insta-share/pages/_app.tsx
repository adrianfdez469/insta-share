import Head from 'next/head';
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { AppContextProvider } from '../components/contexts/ContextDecorator';

/**
 * Styles
 */
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const CustomApp = ({ Component, pageProps }: AppProps) => {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Welcome to insta-share!</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </>
  )
}

export default CustomApp;
