import React, { FC, ReactNode } from 'react'
// import Header from './Header'
import CustomSidebar from './Sidebar'
import Layout from '../Layout'
import { WithAuth } from '../../../HOC/WithAuth'
import Navbar from "../Navbar"


const DashboardLayout = ({ pageTitle, children }) => {
  return (
    <Layout pageTitle={pageTitle}>
      <div className='d-flex flex-column vh-100 h-100 bg-primo--light ' >
        <Navbar/>
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
