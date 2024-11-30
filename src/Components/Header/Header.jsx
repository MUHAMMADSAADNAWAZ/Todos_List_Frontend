import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ThemeContext } from '../ThemeContext/Theme'
import { ROUTE_LOGIN , ROUTE_ADD_TODO, ROUTE_HOME } from '../../constants';
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'


const Header = () => {

  const {setUserid , setName, theme , setTheme}  = useContext(ThemeContext);
  const navigate = useNavigate();

   const updateTheme = () =>{
    setTheme(prevTheme => prevTheme === "default" ? "dark" : "default")
  }  

  useEffect(()=>{
    console.log("Current State" , theme);
  } , [theme])


  const location = useLocation();

  const [activeElement , setActiveElement] = useState(location.pathname);

  useEffect(()=>{
    setActiveElement(location.pathname);
  } , [location.pathname]);

  const Logout = () =>{
    setName("");
    setUserid("");
    toast.success("Successfull Logged Out");
    navigate(ROUTE_LOGIN);
  }

  return (
    <div className='header p-3 bg-[#9395D3] text-white sticky top-0'>
      <ul className='flex justify-around text-2xl font-semibold'>
        <li className= {`hover:text-gray-800 cursor-pointer font-bold ${activeElement === ROUTE_HOME ? 'text-black' : ""}`}><NavLink to={ROUTE_HOME}>Home</NavLink></li>
        <li className= {`hover:text-gray-800 cursor-pointer font-bold ${activeElement === ROUTE_ADD_TODO ? 'text-black' : ""}`}><NavLink to={ROUTE_ADD_TODO}>Add Task</NavLink></li>
        <div className="flex gap-4">
        <button className=' text-xl bg-black rounded-lg py-1 px-3' onClick={updateTheme}>Change Theme</button>
        <button className=' text-xl bg-black rounded-lg py-1 px-3' onClick={Logout}>Logout</button>
        </div>
      </ul>

    </div>
  )
}

export default Header