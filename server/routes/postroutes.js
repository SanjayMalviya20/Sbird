import express from "express"
import {  create, deletePost, followingpost, getallposts, likepost } from "../controllers/postCon.js"
// import vailduser from "../middleware/middleware.js"
const router=express.Router()
router.post("/create/:id", create)
router.delete("/delete/:id", deletePost)
router.put("/like/:id/:userid", likepost)
router.get("/allpost/:id",getallposts)
router.get("/followpost/:id",followingpost)

export default router