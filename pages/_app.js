import { useState, useEffect } from 'react';
import '../styles/globals.css';
// import { csrfToken } from '../node_modules/csrf';
import { Spin } from 'antd';
import Router from 'next/router';
import Loader from '../components/layout/Loader';
import { Provider } from '../context';
import PageLoader from '../components/layout/PageLoader';

function MyApp({ Component, pageProps }) {
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   Router.events.on('routeChangeStart', () => setLoading(true));
  //   Router.events.on('routeChangeComplete', () => setLoading(false));
  //   Router.events.on('routeChangeError', () => setLoading(false));
  //   return () => {
  //     Router.events.off('routeChangeStart', () => setLoading(true));
  //     Router.events.off('routeChangeComplete', () => setLoading(false));
  //     Router.events.off('routeChangeError', () => setLoading(false));
  //   };
  // }, [Router.events]);

  return (
    <Provider>
      <Component {...pageProps} />
      {/* {loading ? <PageLoader /> : <></>} */}
    </Provider>
  );
}

export default MyApp;
