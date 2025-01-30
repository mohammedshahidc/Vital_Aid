import React from 'react'
import Hero from "./hero"
import About from './about'
import Specialities from './specialities'
import Event from './event'

function Homepage() {
  return (
    <div className=' overflow-hidden'>
      <Hero />
      <About />
      <Specialities />
      <Event />
    </div>
  )
}

export default Homepage
