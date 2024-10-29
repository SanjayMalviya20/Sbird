import React, { useEffect } from 'react'
import Leftside from './Leftside'
import Feed from './Feed'
import Rightside from './Rightside'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
  const navigate = useNavigate()
  const user=useSelector( (state) => state.user.user) 
  useEffect(()=>{
    if(user===null){
      navigate("/auth")   
    }
  },[])
  return (
    <>
    <div style={{height:"100%",width:"100%", display:"flex",alignItems:"baseline",justifyContent:"center"}}>
    <Leftside/>
    <Outlet/>    
    <Rightside/>
    </div>
      
    </>
  )
}

export default Home
