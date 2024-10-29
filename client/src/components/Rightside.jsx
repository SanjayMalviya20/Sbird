import axios from 'axios';
import React, { useEffect } from 'react'
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUser } from '../actions/action';
import { Link } from 'react-router-dom';
import webprofile from "./profile.jpg"
const Rightside = () => {
  const { user, otheruser } = useSelector((state) => state?.user)
  const dispatch = useDispatch()
  const alluesr = async () => {
    const data = await axios.get(`http://localhost:8000/auth/alluser/${user?._id}`)
    
    dispatch(setOtherUser(data.data))
  }

  useEffect(() => {
    alluesr()
  }, [])
  return (
    <>
      <div style={{ padding: "10px", flex: "3", display: "flex", gap: "7px", justifyContent: "center", flexDirection: "column" }}>
      
        <label className="input input-bordered flex items-center gap-2 h-10 rounded-full input-primary ">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
        </label>
        <div className="w-full">
         { <h1>suggested for you</h1>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", overflow: "auto", height: "300px", scrollbarWidth: "none" }}>
          {otheruser?.users?.map((data) => {
            return (
              <>
                <div key={data?._id} style={{ width: "100%", gap: "6px", borderRadius: "5px", cursor: "pointer", backgroundColor: "black", display: "flex", padding: "10px", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
                  {
      <div className="avatar p-2">
      <div className="ring-primary ring-offset-base-100 w-8 rounded-full ">
        <img src={data?.profilePic ? `http://127.0.0.1:8000/image/${data?.profilePic}` : webprofile} />
      </div>
    </div>

          }
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <h1>{data?.name}</h1>
                      <h1>@{data?.username}</h1>
                    </div>
                    <Link to={`/profile/${data?._id}`}>
                    <button className='btn btn-danger rounded-full'>profile</button>
                    </Link>
                  </div>
                </div>
              </>
            )
          })
          }
        </div>

      </div>
    </>
  )
}

export default Rightside
