import Home from '../../../../components/doctor/Navbar/navbar'
import Sidebar from '../../../../components/doctor/sidbar/sidbar'
import React from 'react'

function Page() {
  return (
    <div className='flex'>
      <Sidebar />

      <Home />
    </div>
  )
}

export default Page