import React from 'react'
import { FaBell, FaHome, FaRegBookmark } from "react-icons/fa"
import { CgMoreO, CgProfile } from "react-icons/cg";
import { SiThunderbird } from "react-icons/si";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUser, setUser } from '../actions/action';

const Leftside = () => {
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const user=useSelector((state)=>state.user.user)
const handlelogout = async() => {
 const data= await axios.post("http://localhost:8000/auth/logout")
 console.log(data.data)
  dispatch(setUser(null))
  dispatch(setOtherUser(null))
  toast.success("Logout successfull")
  navigate("/Auth")
  console.log("dd")

  }

  const handlebookmark = async() => {
    navigate(`/bookmarkpost/${user?._id}`)
  }
  return (
    <>
    <div style={{flex:"3",display:"flex",justifyContent:"center",alignItems:"center"}}>
 
      <ul className="menu bg-black rounded-md   w-56">
        <>
          <SiThunderbird size={35} style={{ margin: "10px" }} />
        </>
        <li>
          <Link to={"/"} style={{ fontSize: "15px" }} >
            <FaHome size={20} />
            home
          </Link>
        </li>
        <li>
          <Link to={`/profile/${user?._id}`} style={{ fontSize: "15px" }} >
            <CgProfile size={20} />
            porfile
          </Link>
        </li>
        <li>
          <a style={{ fontSize: "15px" }} >
            <FaRegBookmark onClick={handlebookmark} size={20} />
            bookmarks
          </a>
        </li>
        <li>
          <Link to={"/premium"} style={{ fontSize: "15px" }} >
            <SiThunderbird size={20} />
            premium
          </Link>
        </li>
        <li>
          <a style={{ fontSize: "15px" }} >
            <FaBell size={20} />
            notification
          </a>
        </li>
        <li>
          <a style={{ fontSize: "15px" }} >
            <CgMoreO size={20} />
            more
          </a>
        </li>
        <li>
          <button onClick={handlelogout} class="btn btn-active">logout</button>
        </li>
      </ul>
      </div>
    </>
  )
}

export default Leftside
