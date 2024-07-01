import React from 'react'
import logo from "../assets/logo.svg"
function Logo({width = "100px"}) {
  return (
    <div className='flex justify-center items-center'>
      <img src={logo} alt="" width={width} />
    </div>
  )
}

export default Logo