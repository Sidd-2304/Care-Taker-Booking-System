import React from 'react'
import {} from '../navbar/Navbar.css'
import { NavLink } from 'react-router-dom'
import img1 from 'E:/dt/src/images/1.jpg'

function Navbar() {
  return (
    <div>
        <nav className='navbar bg-dark bg-gradient d-flex justify-content-between'>
            <img src={img1} alt='' className='img1 mx-3 m-1'/>
            <ul className='nav fs-4 fw-semibold justify-content-end align-items-center'>
                <li className='nav-item'>
                    <NavLink className='text-light nav-link' to='home'>
                    Home
                    </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='text-light nav-link' to='register'>
                    Register
                    </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='text-light nav-link' to='login'>
                    Login
                    </NavLink>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar