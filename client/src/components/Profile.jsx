import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom"
import { setProfile, setfollow, setrefresh, setupdate } from '../actions/action';
import webcover from "./image.png"
import webprofile from "./profile.jpg"
import { CgImage } from 'react-icons/cg';
import Skeleton from './skeleton';
const Profile = () => {
  const click = useRef()
  const close = useRef()
  const { id } = useParams()
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.user.profile.user)
  const refresh = useSelector((state) => state.user?.refresh)
  console.log(refresh)
  // const postid = useSelector((state) => state.user.postid)
  const post = useSelector((state) => state.posts.getallpost)
  const user = useSelector((state) => state.user.user)
  const [name, setname] = useState("");
  const [profilepic, setprofilepic] = useState(null);
  const [bio, setbio] = useState("");
  const pic = useRef()
  const [pictype, setpictype] = useState("profilepic")
  //console.log(pictype)
  const [username, setusername] = useState("");
  //console.log(pictype)
  const getprofile = async () => {
    const data = await axios.get(`http://localhost:8000/auth/getprofile/${id}`)
    dispatch(setProfile(data.data))
    //console.log(data.data)
  }
  useEffect(() => {
    getprofile()
  }, [id])

  const follow = async () => {
    const data = await axios.put(`http://localhost:8000/auth/follow/${id}/${user?._id}`)
    //console.log(data.data.friend._id)
    dispatch(setfollow(data.data.friend._id))
  }
  const updateprofile = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append("name", name)
    formdata.append("image", profilepic)
    formdata.append("picType", pictype)
    formdata.append("username", username)
    formdata.append("bio", bio)
    dispatch(setrefresh(true))
    const data = await axios.put(`http://localhost:8000/update/${user?._id}`, formdata)
    dispatch(setupdate(data?.data))
    dispatch(setrefresh(false))
    getprofile()
    setname("")
    setusername("")
    setprofilepic(null)
    setbio("")
    close.current.click()

  }

  return (
    <>
      {
        [profile].map((data,index) => {
          return (
            <>
              <div >
                <label hidden ref={click} htmlFor="my_modal_7" className="btn">open modal</label>
                {/* Put this part before </body> tag */}
                <input hidden type="checkbox" id="my_modal_7" className="modal-toggle" />
                <div style={{ scrollbarWidth: "none" }} className="modal" role="dialog">
                  <form onSubmit={updateprofile} encType='multipart/form-data' style={{ scrollbarWidth: "none", display: "flex", flexDirection: "column", gap: "10px" }} className="modal-box">
                <h1>Edit Profile</h1>
                    <input name='name' value={name} onChange={(e) => setname(e.target.value)} type="text" placeholder="Type name" className="input input-bordered w-full max-w-xs" />
                    <input name='username' value={username} onChange={(e) => setusername(e.target.value)} type="text" placeholder="Type username" className="input input-bordered w-full max-w-xs" />
                    <input name='bio' value={bio} onChange={(e) => setbio(e.target.value)} type="text" placeholder="Type bio" className="input input-bordered w-full max-w-xs" />
                    <input hidden ref={pic} onChange={(e) => setprofilepic(e.target.files[0])} type="file" className="input input-bordered w-full max-w-xs" />
                    <CgImage onClick={() => pic.current.click()} size={25} cursor={"pointer"} />
                    {/* <div style={{display:"flex",flexDirection:"row",gap:"10px"}}>

<input checked  onChange={(e) => setpictype(e?.target?.value)} type="radio" placeholder='Type here' value="profilepic" name="picType" id="" />
<input onChange={(e) => setpictype(e?.target?.value)}  type="radio" value="coverpic" name="picType" id="" />
    </div> */}
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">choose for profile</span>
                        <input onChange={(e) => setpictype(e?.target?.value)} type="radio" value="profilepic" name="pic" className="radio checked:bg-red-500" />
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">choose for cover</span>
                        <input onChange={(e) => setpictype(e?.target?.value)} type="radio" value="coverpic" name="pic" className="radio checked:bg-blue-500" />
                      </label>
                    </div>
                    <button type="submit" className='btn btn-primary'>update</button>
                  </form>
                  <label ref={close} style={{ scrollbarWidth: "none" }} className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                </div>
              </div>

              {refresh===true? 
              <div  key={index} style={{ flex: "6", padding: "10px", display: "flex", flexDirection: "column", gap: "10px" }}><Skeleton />
              </div> : <div key={data?._id} style={{ flex: "6", padding: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                  <Link to={"/"}><FaArrowLeft size={20} /></Link>
                  <span style={{ fontSize: "18px", color: "skyblue" }}>{data?.name}</span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ fontSize: "18px" }}>post :</span>
                    <span style={{ fontSize: "16px" }}>{post?.filter((item) => item?.userid === user?._id).length}</span>
                  </div>
                </div>
                <div style={{ position: "relative", marginBottom: "20px" }}>
                  <img
                    src={data?.coverPic ? `http://127.0.0.1:8000/image/${data?.coverPic}` : webcover} style={{ width: "100%", height: "230px" }} alt="" />

                  <div style={{ position: "absolute", bottom: "-30px", left: "3px", borderRadius: "50%" }}>
                    
                     
                      <div className="avatar p-2">
                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                          <img src={data?.profilePic ? `http://127.0.0.1:8000/image/${data?.profilePic}` : webprofile} />
                        </div>
                      </div>

                    

                  </div>
                </div>



                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: "3px", flexDirection: "column" }}>
                    <span>{data?.name}</span>
                    <span>@{data?.username}</span>
                  </div>
                  {
                    user?._id !== profile?._id ? <button onClick={() => follow()} className='btn btn-primary rounded-full '>{user?.following?.includes(profile?._id) ? "following" : "follow"}</button> : <button onClick={() => { click.current.click() }} className='btn btn-primary rounded-full '>edit profile</button>
                  }
                </div>
                <h1 style={{ textAlign: "justify", fontSize: "14px" }}>
                  {profile?.bio && "your bio: "}{profile?.bio ? profile.bio : ""}
                </h1>
              </div>}
            </>
          )
        })
      }


    </>
  )
}

export default Profile
