import React from 'react'
import './Navbar.css'
import {NavLink} from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className='nav'>
        <div className='container'>
           <h1>Smart<span>Yatra</span></h1>
           <NavLink to='/' className={({isActive})=>`${isActive ? 'active':'list'}`}>Home</NavLink>
           <NavLink to='/explore' className={({isActive})=>`${isActive ? 'active':'list'}`}>Explore</NavLink>
           <NavLink to='/package' className={({isActive})=>`${isActive ? 'active':'list'}`}>Packages</NavLink>
           <NavLink to='/aboutus' className={({isActive})=>`${isActive ? 'active':'list'}`}>About us</NavLink>
           <button className='loginbtn'>Login/SignUp</button>
        </div>
    </nav>
  )
}
