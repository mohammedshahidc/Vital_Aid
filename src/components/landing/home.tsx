import React from 'react'
import Hero from "./hero"
import About from './about'
import Specialities from './specialities'
import Event from './event'

import HealthcareLayout from './healthservice'
import Aireport from './aireport'

function Homepage() {
  return (
    <div className='bg-white overflow-hidden'>
      <Hero />
      <HealthcareLayout/>
      <Specialities />
      <Aireport/>
      <About />
      <Event />
    </div>
  )
}

export default Homepage
