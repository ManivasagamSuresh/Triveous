import React, { useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';


function Navbar({wish,view}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [navopen,setNavopen] = useState(false);
    const handleNavbar= ()=>{
        setNavopen(!navopen)
    }
    const handleLogout = ()=>{
        dispatch(logout());
        navigate('/login')
    }
  return (
    <>
    
    <div className='h-fit py-6 md:py-2 bg-white text-black flex flex-col items-center md:items-end px-5 gap-3 italic '>
    <div className={` right-3 top-3 text-xl font-semibold h-fit ${navopen ?"hidden":"absolute"} md:hidden`} onClick={handleNavbar}> <GiHamburgerMenu/> </div>
        <div className={`${navopen?"flex":"hidden"} flex-col gap-3 py-8 md:py-2 md:flex md:flex-row  md:gap-6 justify-end`}>

        <div className='absolute right-3 top-3 text-xl font-semibold italic md:hidden' onClick={handleNavbar}>X</div>
        {!view ?
        
      !wish?<button className='text-lg font-semibold italic' onClick={()=>{navigate("/wishlist")}}>WISHLIST</button>:
        <button className='text-lg font-semibold italic' onClick={()=>{navigate("/home")}}>HOME</button>
      :null
      }
        {view ?
        <>
        <button className='text-lg font-semibold italic' onClick={()=>{navigate("/wishlist")}}>WISHLIST</button>
        <button className='text-lg font-semibold italic' onClick={()=>{navigate("/home")}}>HOME</button>
        </>
        :
        null}
        <button className='text-lg font-semibold flex items-center gap-2 italic' onClick={handleLogout}><AiOutlineLogout/> <span>LOGOUT</span></button>
        </div>
    </div>
    </>
  )
}

export default Navbar