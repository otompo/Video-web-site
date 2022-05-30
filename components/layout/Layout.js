import { useEffect } from 'react';
import Head from 'next/head';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'nprogress/nprogress.css';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import TawkTo from 'tawkto-react';

const Layout = ({ children, title = 'Afrotalian' }) => {
  useEffect(() => {
    var tawk = new TawkTo(process.env.TAWK_PROPERTY_ID, process.env.TAWK_ID);

    https: tawk.onStatusChange((status) => {
      // console.log(status);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Get all your quality video production when it comes to Video production services Specialize in weddings
          Commercial & private video advertising
          Film making
          Parties videos
          Family videos
          Business events videos"
        />
        <meta
          property="og:title"
          content="Afrotalian is  the best organization to contact when it comes to video production"
        />
        <meta
          property="og:description"
          content="Contact us tor your quality video production when it comes to Video production services Specialize in weddings
          Commercial & private video advertising
          Film making
          Parties videos
          Family videos
          Business events videos"
        />
        <meta property="og:site_name" content="Afrotalian" />
        <meta
          property="og:image"
          content="https://afrotalian.com/img/default.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://afrotalian.com/img/default.png"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
        <script
          defer
          src="https://use.fontawesome.com/releases/v5.15.4/js/all.js"
          integrity="sha384-rOA1PnstxnOBLzCLMcre8ybwbTmemjzdNlILg8O7z1lUkLXozs4DHonlDtnE7fpc"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <Navbar />

      <ToastContainer position="bottom-right" />

      {children}

      <Footer />
    </div>
  );
};
export default Layout;
