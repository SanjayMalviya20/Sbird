import express from "express"
import {  commentonpost, create, deletePost, followingpost, getallposts, likepost ,getcomment, deletecomment} from "../controllers/postCon.js"
// import vailduser from "../middleware/middleware.js"
const router=express.Router()
router.post("/create/:id", create)
router.delete("/delete/:id", deletePost)
router.put("/like/:id/:userid", likepost)
router.get("/allpost/:id",getallposts)
router.get("/followpost/:id",followingpost)
router.post("/comment/:id",commentonpost)
router.get("/getcomment/:id",getcomment)
router.delete("/deletecomment/:id",deletecomment)
export default router