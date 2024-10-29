import React, { useState } from 'react'

const Commentbox = () => {
  const [comment, setcomment] = useState("")
  console.log(comment)
  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(comment)
  }
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
          <div>
            <p className='text-sm text-white border border-gray-700 p-3 pl-2'>sas</p>

          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
      </form>

    </>
  )
}

export default Commentbox
