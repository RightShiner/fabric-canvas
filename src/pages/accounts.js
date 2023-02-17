import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
// import { AppLoader } from 'Components/Shared/AppLoader'
import { BriefcaseIcon } from '@heroicons/react/24/solid'
import StatisticsCard from 'components/StatisticsCard'
import PlanCard from 'components/PlanCard'
import { NextPageWithLayout } from './_app'
import { getUserStatistics } from 'queryhook/getUserStatistics'
import DashboardLayout from "components/Layout/Dashboard/DashboardLayout"

const cardIcon = <BriefcaseIcon className='w-10 h-10' aria-hidden />

const Accounts = () => {
  const { data, isLoading } = useQuery('userStatistics', getUserStatistics)
  // if (isLoading)
  //   return (
  //     <h2 className=''>
  //       {' '}
  //       <AppLoader isLoading={isLoading} size={70} />
  //     </h2>
  //   )

  return (
    <div className='h-full px-3'>
      <div className='d-flex mb-4 flex-wrap justify-start gap-4 mb-7 lg:gap-24'>
        <StatisticsCard value={data?.user_info?.catalogs} label='Number of Catalogs' icon={cardIcon} />
        <StatisticsCard value={data?.user_info?.products} label='Number of Products' icon={cardIcon} />
        <StatisticsCard
          value={data?.user_info?.product_processed}
          label='Number of Processed Products'
          icon={cardIcon}
        />
      </div>
      <div className='flex justify-between gap-5 mb-7'>
        <PlanCard title='Starter Plan' price={data?.user_info?.['Credits used']} balance={data?.user_info?.balance} />
      </div>
    </div>
  )
}
Accounts.getLayout = function (page) {
  return <DashboardLayout pageTitle='AI Image'>{page}</DashboardLayout>
}

export default Accounts
