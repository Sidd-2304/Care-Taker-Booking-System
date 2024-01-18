import React from 'react'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'
import { Outlet } from 'react-router-dom'

function RouteLayout() {
  return (
    <div>
        <Navbar/>
        <div style={{minHeight:'85vh'}}>
            <Outlet />
        </div>
        <Footer/>
    </div>
  )
}

export default RouteLayout