import Layout from '../Layout'


const PublicLayout = ({ pageTitle, children }) => {
  return <Layout pageTitle={pageTitle}>
    {children}
  </Layout>
}

PublicLayout.defaultProps = {
  pageTitle: 'title'
}

export default PublicLayout
