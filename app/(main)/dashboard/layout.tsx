import React, { Suspense } from 'react'
import DashboardPage from './page'
import { BarLoader} from 'react-spinners'

const dashboardLayout = () => {
  return (
    <div className='p-6'>
        <div className='text-5xl font-bold gradient-title'>
            Dashboard
        </div>
        <Suspense fallback={<BarLoader className='mt-4' width={"100%"} color='#9333ea' />}>
            <DashboardPage/>    
        </Suspense>
        
    </div>
  )
}

export default dashboardLayout