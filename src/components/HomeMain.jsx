import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import HomeCard from './HomeCard';
import Navbar from './Navbar';
import { BsToggle2Off } from 'react-icons/bs';
import { BsToggle2On } from 'react-icons/bs';
import axios from 'axios';
import { AiTwotoneSecurityScan } from 'react-icons/ai';



function HomeMain() {
  const {currentUser} = useSelector((state) => state.user);
  const [toggle,setToggle] = useState(false);
  const [articles,setArticles] = useState([])
  console.log(currentUser);

  useEffect(()=>{

    const fetchdata = async()=>{
      try {
        
      // const data = await axios.get("https://newsapi.org/v2/everything?q=bitcoin&apiKey=9b31dc7f3c8547609aabff85e02ddb69");
      const data = await axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=9b31dc7f3c8547609aabff85e02ddb69");
      
      console.log(data.data.articles);
      setArticles(data.data.articles)
        
      } catch (error) {
        console.log(error);
      }
      
    }
    fetchdata()
  },[])


  const handleToggle =()=>{
    setToggle(!toggle)
  }

  return (
    <div className='min-h-screen bg-slate-400 '>
      <Navbar wish={false}/>
      <h1 className='my-4 text-xl md:text-3xl font-bold'>THE WORLD TIMES</h1>
      <div className='hidden md:flex gap-2 absolute right-10 top-20 cursor-pointer '><span>Change View</span> <span>{toggle ? <BsToggle2On size={"25px"} onClick={handleToggle}/> : <BsToggle2Off size={"25px"} onClick={handleToggle}/>} </span></div>
      <div className='flex flex-col items-center md:flex-row justify-center flex-wrap'>

    {
      articles.map((article)=>{
        return <HomeCard toggle = {toggle} data={article}/>
      })
    }  
    </div>
    </div>
  )
}

export default HomeMain;