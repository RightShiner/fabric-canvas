import { FC, Fragment, ReactNode } from 'react'
import Head from 'next/head'


const Layout = ({ pageTitle, children }) => {
  return (
    <>
      <Head>
        <title>{pageTitle || 'AI'}</title>
      </Head>
      {children}
    </>
  )
}

Layout.defaultProps = {
  pageTitle: 'page title'
}

export default Layout
