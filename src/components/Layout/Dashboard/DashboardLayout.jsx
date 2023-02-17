import React, { FC, ReactNode } from 'react'
// import Header from './Header'
import CustomSidebar from './Sidebar'
import Layout from '../Layout'
import { WithAuth } from '../../../HOC/WithAuth'


const DashboardLayout = ({ pageTitle, children }) => {
  return (
    <Layout pageTitle={pageTitle}>
      <div className='d-flex vh-100 h-100 ' >
        <CustomSidebar />
        <div className='` w-100 h-100 p-4'>
          {/* <Header /> */}
          <div className="card bg-white w-100 p-4">{children}</div>
        </div>
      </div>
    </Layout>
  )
}

DashboardLayout.defaultProps = {
  pageTitle: 'title'
}

export default WithAuth(DashboardLayout)
