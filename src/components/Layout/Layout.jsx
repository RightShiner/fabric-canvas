import Head from "next/head";

const Layout = ({ pageTitle, children }) => {
  return (
    <>
      <Head>
        <title>Image App</title>
        <meta name="description" content="Image App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
};

Layout.defaultProps = {
  pageTitle: "page title",
};

export default Layout;
