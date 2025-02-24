import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Bookmarkpost = () => {
  // const user =useSelector(state=>state.user.user)
  const { id } = useParams()
  const [Bookmark, setBookmark] = useState([]);
console.log(Bookmark)
  const bookmarks = async () => {
    const bookmarkdata = await fetch(`http://localhost:8000/auth/allbookmarkpost/${id}`, {
      method: "PUT"
    })
    const data = await bookmarkdata.json()
    console.log(data)
    setBookmark(data)
  }
  
  useEffect(() => {
    bookmarks()
  }, [id])
  return (
    <>
      <div style={{ flex: "6", display: "flex", alignItems: "center",  justifyContent: "center", padding: "10px", flexDirection: "column" }}>
        <h1> Bookmarks: {Bookmark?.bookmarkedPosts?.length}</h1>
        <div style={{display:"flex",flexDirection:"column",gap:"20px",overflowY:"scroll",height:"490px",scrollbarWidth:"none"}}>
          
       
          {
            Bookmark?.bookmarkedPosts?.map((item)=>{
              return(
                <>
                <>
                <div  className="card bg-base-100   w-96 shadow-xl">
          <figure>
            <img src={`http://127.0.0.1:8000/image/${item.image}`} alt="" />
          </figure>

          <div className="card-body">
            <h2 className="card-title">
              <div className="badge badge-secondary">LIKES</div>
              {item?.likes.length}
            </h2>
            <p>caption:{item?.desc}</p>
           
            </div>
        </div>
          </>

          </>
              )
            })
          }
           </div>

      </div>
    </>
  )
}

export default Bookmarkpost
