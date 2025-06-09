import React, { Children } from 'react'

const DashboardLayout = () => {
  return (
    <div className='p-6 bg-white shadow-md rounded-lg'>
       <h1 className='text-2xl font-semibold mb-4'>Dashboard</h1>
       {Children}
    </div>
  )
}

export default DashboardLayout;
