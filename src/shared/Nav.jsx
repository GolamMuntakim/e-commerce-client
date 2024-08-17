
import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { GiQueenCrown } from "react-icons/gi";

import './shared.css'
const Nav = () => {
  const {user,logOut} = useContext(AuthContext)
  const [theme, setTheme] = useState(()=>{
    return localStorage.getItem('theme') || 'light';
})
useEffect(() => {
  localStorage.setItem('theme', theme)
  const localTheme = localStorage.getItem('theme')
  document.querySelector('html').setAttribute('data-theme', theme)
}, [theme])
const handleToggle = e => {
  setTheme(prevTheme=>(prevTheme==='light' ? 'dark' : 'light'))
 
}
  
    return (
        <div>
            <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <div><NavLink to="/">Home</NavLink></div>
    <div><NavLink to="makeCart" >Add Product Cart</NavLink></div>
      </ul>
    </div>
    <a className="lobster-regular text-xl flex items-center gap-2"><GiQueenCrown className='text-4xl hidden lg:flex'/><div>Zig<span className='text-red-700'>ZZ</span>ag</div></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <div className='flex gap-4'>
    <div><NavLink to="/" style={({isActive})=>(isActive?{borderBottom:"2px solid", color:"black"}:{font:"bold"})}>Home</NavLink></div>
    <div><NavLink to="makeCart" style={({isActive})=>(isActive?{borderBottom:"2px solid", color:"black"}:{font:"bold"})}>Add Product Cart</NavLink></div>
    </div>
    {/* <div><NavLink to="/">Home</NavLink></div>
    <div><NavLink to="makeCart" >Add Product Cart</NavLink></div> */}
    </ul>
  </div>
  <div className="navbar-end">
    {/* <a className="btn">Button</a> */}
    <details className="dropdown dropdown-end">
  <summary className="btn m-1">
    {/* open or close */}
    <div className="avatar">
  <div className="w-10 rounded-full">
    <img src={user?.photoURL} />
  </div>
</div>
    </summary>
  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52  shadow">
    <li><a>{user?.displayName}</a></li>
    <li onClick={logOut}><a>Log Out</a></li>
   <li><a  className='flex items-center'>Dark/Light <input onChange={handleToggle} type="checkbox" className="toggle" defaultChecked /></a></li>
  </ul>
</details>
  </div>
</div>
        </div>
    );
};

export default Nav;