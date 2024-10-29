
import React, { useState } from 'react'
import axios from 'axios'
import { SiThunderbird } from "react-icons/si";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  setUser } from '../actions/action';
const Auth = () => {
  const dispatch=useDispatch()
const user=  useSelector((state)=>state.user)
// console.log(user)
    const [Auth, setAuth] = useState(false);
    const [Text, setText] = useState({
      name:"",
      username:"",
      email:"",
      password:""
    });
    const  [login, setlogin] = useState({
      email:"",
      password:""
    });
    const navigate=useNavigate()
    const onchange=(e)=>{
      setText({...Text,[e.target.name]:e.target.value})
    }
    
    const onchangeLogin=(e)=>{
      setlogin({...login,[e.target.name]:e.target.value})
    }
    
    const hadleSubmit=async(e)=>{
      e.preventDefault(); 
      if(!Text.username || !Text.email || !Text.password){

  toast.error("Please fill all the fields",{onClose:true})
  return;
      }
      try {  
        const newData=await axios.post("http://localhost:8000/auth/register",Text)
        toast.success("Welcome buddy",{onClose:true})
    
        if(newData.data){
          toast.success("Welcome buddy")
          setAuth(false)
        }

        setText({
          username:"",
          email:"",
          password:"" })
      } catch (error) {
        // console.log(error)
        toast.error("Something went wrong",{onClose:true})
        
      }

    }
    const hanlelogin=async(e)=>{
      e.preventDefault();
      if(!login.email || !login.password){
        toast.error("Please fill all the fields",{onClose:true})
        return
      }
      const newData=await axios.post("http://localhost:8000/auth/login",login)
      console.log(newData.data)
   if(newData.data.token){
    toast.success(`${newData.data.message}`)
    dispatch(setUser(newData.data.user))
    navigate("/")
    setlogin({
      email:"",
      password:""
    })
  }  
    }    
    

  return (
    <>
  
    <SiThunderbird size={35}/>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"62%"}}>
   {
   Auth?<>
  <form onSubmit={hadleSubmit} style={{display:"flex", gap:"10px",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>



<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
  <input type="text" name="name"  className="grow" value={Text && Text?.name} placeholder="name" onChange={onchange}/>
</label>
<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
  <input type="text" name="username"  className="grow" value={Text && Text?.username} placeholder="Username" onChange={onchange}/>
</label>
<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="email" name='email' className="grow"  value={Text && Text?.email} placeholder="Email" onChange={onchange}/>
</label>

<label className="input input-bordered flex items-center gap-2">
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input type="text" className="grow" value={Text && Text?.password}  name='password' placeholder="password" onChange={onchange}/>
</label>
<div style={{display:"flex",gap:"10px",alignItems:"center"}}>
<p onClick={()=>setAuth((pre)=>!pre)} style={{textDecoration:" underline",fontSize:"14px",color:"#9CA3AF",cursor:"pointer"}}>Already have an account?</p>
<button   type="submit" className="btn btn-outline btn-primary">signup</button>
</div>
</form>
     </>
:
<>
<form onSubmit={hanlelogin} style={{display:"flex", gap:"10px",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
  <input type="text" className="grow" name='email' placeholder="Enter email" value={login?.email} onChange={onchangeLogin}/>
</label>
<label className="input input-bordered flex items-center gap-2">
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input type="text" className="grow" name='password' placeholder="Password" value={login?.password} onChange={onchangeLogin}/>
</label>
<div style={{display:"flex",gap:"10px",alignItems:"center"}}>
<p  onClick={()=>setAuth((pre)=>!pre)} style={{textDecoration:" underline",fontSize:"14px",color:"#9CA3AF",cursor:"pointer"}}>Create an account</p>
<button type="submit" className="btn btn-outline btn-primary">login</button>
</div>
</form>
</>
}
</div>
    </>
  )
}

export default Auth
