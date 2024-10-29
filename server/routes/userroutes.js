import express from "express"
import { bookmarkspost, follow, getalluser, getbookmarks, getprofile, login, logout, register, updateDetails } from "../controllers/userCon.js"
import vailduser from "../middleware/middleware.js"
const router =express.Router()
router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.put("/update/:id",updateDetails)
router.put("/bookmark/:id/:userid", bookmarkspost)
router.get("/getbookmark/:id",vailduser,getbookmarks)
router.get("/getprofile/:id",getprofile)
router.get("/alluser/:id",getalluser)
router.put("/follow/:id/:userid",follow)
export default router