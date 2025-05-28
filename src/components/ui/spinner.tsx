import React from 'react'
import "./spinner.css"

function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-transparent">
        <div id='loader'></div>
    </div>
    
  )
}

export default Spinner