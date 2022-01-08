/** @format */

import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children, title = 'Book best hotels for your holiday' }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
