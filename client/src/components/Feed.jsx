
import React, { useEffect, useRef, useState } from 'react'

import { BsBookmark, BsBookmarkCheck, BsImage } from "react-icons/bs"
import { CgComment, CgProfile } from 'react-icons/cg';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { setallpost, setlodaing, setrefresh } from '../actions/postaction';
import Skeleton from './skeleton';
import axios from 'axios';
import toast from 'react-hot-toast'
import { setbookmark } from '../actions/action';
import Commentbox from './Commentbox';
import Avatar from 'react-avatar';
import webprofile from "./profile.jpg"
const Feed = () => {
  const [Text, setText] = useState("");
  const [file, setfile] = useState({ url: null })
  const [postid, setpostid] = useState("");
  const fileRef = useRef()
  const commentref = useRef()
  const dispatch = useDispatch()
  const userallpost = useSelector((state) => state.posts.getallpost)
  const user = useSelector((state) => state.user.user)
  const { loading } = useSelector((state) => state.posts)
  const datapost = async () => {
    // dispatch(setlodaing({ loading: true }))
    const data = await axios.get(`http://localhost:8000/post/allpost/${user?._id}`)
    dispatch(setallpost({ data: data?.data }))
    // dispatch(setlodaing({ loading: false }))
  }

  useEffect(() => {
    datapost()
  }, [])


  const formData = new FormData()
  formData.append("desc", Text)
  if (file.url) {
    formData.append("image", file?.url)
  }

  const handlesubmit = async (e) => {
    try {
      e.preventDefault()
      if (Text === "") {
        toast.error("write something", { onClose: true })
        return;
      }
      dispatch(setlodaing({ loading: true }))
      const data = await axios.post(`http://localhost:8000/post/create/${user?._id}`, formData)
      toast.success("post create", { onClose: true })
      //console.log(data.data)
      datapost()
      dispatch(setlodaing({ loading: false }))
      setText("")
      setfile({ url: null })
    } catch (error) {
      toast.error(error?.response?.data?.message)

    }

  }

  const deletepost = async (id) => {
    try {
      dispatch(setlodaing({ loading: true }))
      await axios.delete(`http://localhost:8000/post/delete/${id}`)
      dispatch(setlodaing({ loading: false }))
      toast.success("post deleted", { onClose: true })
      datapost()
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  const likepost = async (id) => {
    try {
      const data = await axios.put(`http://localhost:8000/post/like/${id}/${user?._id}`)
      if (data.data.message === "Post unliked successfully") {
        toast.success("post unliked", { onClose: true })
      }
      else if (data.data.message === "Post liked successfully") {

        toast.success("post liked", { onClose: true })
      }
      datapost()
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  const bookmarkpost = async (id) => {
    try {
      const data = await axios.put(`http://localhost:8000/auth/bookmark/${id}/${user?._id}`)
      //console.log(data.data.id)
      dispatch(setbookmark(data?.data?.id))
      //  if(data.data.message==="post bookmarked"){
      //    toast.success("post bookmarked",{onClose:true})

      //  }
      //   if(data.data.message==="post unbookmarked "){
      //   toast.success("post unbookmarked",{onClose:true})
      //  }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <>
      {/* The button to open modal */}
      <label hidden ref={commentref} htmlFor="my_modal_7" className="btn">open modal</label>
      <Commentbox id={postid} />
      <div style={{ overflow: "auto", height: "97vh", scrollbarWidth: "none", flex: "6", }}>

        <div style={{ padding: "10px", display: "flex", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
            <h1 style={{ borderBottom: "2px solid rgb(73 77 118)", cursor: "pointer" }} className='p-3'>for you</h1>
            <h1 style={{ borderBottom: "2px solid rgb(73 77 118)", cursor: "pointer" }} className='p-3'>following</h1>
          </div>

          <form onSubmit={handlesubmit} encType='multipart/form-data' style={{ display: "flex", flexDirection: "column", gap: "16px", justifyContent: "center", width: "100%", alignItems: "center" }}>
            <div style={{ display: "flex", width: "100%", justifyContent: "center", gap: "20px" }}>
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                  <img src={user?.profilePic ? `http://127.0.0.1:8000/image/${user?.profilePic}` : webprofile} />
                </div>
              </div>
              <input
                type="text"
                name='desc'
                value={Text}
                onChange={(e) => { setText(e.target.value) }}
                placeholder="create post"
                className="input  input-bordered input-primary rounded-full w-full max-w-xs" />
            </div>

            <div style={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems: "center" }}>
              <input type="file" hidden ref={fileRef} name='image' onChange={(e) => { setfile({ url: e.target.files[0] }) }} accept="image/*" />
              <div onClick={() => fileRef.current.click()} >
                <BsImage color='#646EE4' cursor={"pointer"} size={25} />
              </div>
              <button type='submit' disabled={Text?.length === 0} style={Text?.length === 0 ? { cursor: "not-allowed" } : { cursor: "pointer" }} className='btn btn-primary btn-outline pl-7 pr-7 rounded-full '>post</button>
            </div>
          </form>


          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }} >
            <div style={{ scrollbarWidth: "none", width: "65%" }}>
              {userallpost?.length === 0 ? <h1 style={{ textAlign: "center", fontSize: "20px" }}>lets start and share post 👾</h1> : <></>}
              {
                userallpost?.map((item) => {
                  return (
                    <>
                      {loading ? <Skeleton /> : <div key={item?._id} style={{ width: "100%", padding: "10px", border: "1px solid #282727", display: "flex", justifyContent: "center", alignItems: "", flexDirection: "column" }}>
                        <div style={{ display: "flex", width: "100%", justifyContent: "start", gap: "5px", alignItems: "center" }}>
                          {
                            user?._id === item?.userid && user?.profilePic ? <img style={{ objectFit: "cover", width: "30px", height: "30px", borderRadius: "50px", border: "2px solid #646EE4" }} src={`http://127.0.0.1:8000/image/${user?.profilePic}`} alt="" /> : <CgProfile size={27} />
                          }

                          <p style={{ fontSize: "14px" }}>@{user?._id !== item?.userid ? <>following</> : user?.username}</p>
                        </div>
                        <p style={{ fontSize: "15px", padding: "4px 0px" }}>{item?.desc}</p>

                        {item.image ? <img src={`http://127.0.0.1:8000/image/${item?.image}`}></img> : <></>}


                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", padding: "10px", alignItems: "center" }}>
                          <div onClick={() => { likepost(item?._id) }} style={{ display: "flex", gap: "2px", alignItems: "center" }}>

                            {item?.likes?.includes(user?._id) ? < FaHeart cursor={"pointer"} size={20} /> : <FaRegHeart cursor={"pointer"} size={20} />}
                            <span>{item?.likes?.length}</span>
                          </div>
                          <div onClick={() => { commentref.current?.click(), setpostid(item?._id) }} style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                            <FaRegCommentDots cursor={"pointer"} style={{ cursor: "pointer" }} size={20} />
                            <span>{item?.comments?.length}</span>
                          </div>
                          <MdDeleteOutline onClick={() => { deletepost(item?._id) }} cursor={"pointer"} style={user?._id !== item?.userid ? { display: "none" } : {}} size={23} />
                          <div style={{ cursor: "pointer" }} onClick={() => { bookmarkpost(item?._id) }}>
                            {
                              user?.bookmarks?.includes(item?._id) ? <BsBookmarkCheck cursor={"pointer"} size={20} /> : <BsBookmark cursor={"pointer"} size={20} />
                            }
                          </div>
                          {/* </> */}
                        </div>
                      </div>}
                    </>
                  )
                })
              }

            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Feed
