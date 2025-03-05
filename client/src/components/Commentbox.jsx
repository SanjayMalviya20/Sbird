import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdOutlineDelete } from 'react-icons/md'
import { useSelector } from 'react-redux'

const Commentbox = ({ id }) => {
  const { user } = useSelector(state => state.user)
  const [comment, setcomment] = useState("")
  const [allcomment, setallcomment] = useState([])
  const getAllcomment = async () => {
    const data = await axios.get(`http://localhost:8000/post/getcomment/${id}`)
    setallcomment(data.data)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!comment) {
      toast.error("make a comment", { onClose: true })
      return
    }
    await axios.post(`http://localhost:8000/post/comment/${id}`, { desc: comment, userid: user._id })
    toast.success("comment added", { onclose: true })
    getAllcomment()

  }

 
  // console.log(allcomment)
  useEffect(() => {
    getAllcomment()
  }, [])
  return (
    < >

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <form onSubmit={handleSubmit} className="modal" role="dialog">
        <div className="modal-box flex gap-4 flex-col">
          <div className="flex gap-4">
            <input onChange={(e) => setcomment(e.target.value)} type="text" placeholder="Type here" className="input input-primary input-sm input-bordered w-full max-w-xs pl-4" />
            <button type="submit" className='btn btn-primary btn-sm'>comment</button>
          </div>
          <div className='text-sm text-white border border-gray-700 gap-3 justify-between w-full p-2 flex items-center pl-2'>
            <p className=''>comment here</p>
          <MdOutlineDelete size={18} color='red' cursor={"pointer"}/>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
      </form>

    </>
  )
}

export default Commentbox
