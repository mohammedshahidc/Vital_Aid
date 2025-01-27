import Home from '@/components/docter/Home/home'
import Sidebar from '@/components/docter/sidbar/sidbar'
import React from 'react'

function Page() {
  return (
    <div className='flex'>
                <Sidebar/>
        
<Home/>
    </div>
  )
}

export default Page