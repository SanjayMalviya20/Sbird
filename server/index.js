import express from "express";
import morgan from "morgan";
import multer from "multer";
const app = express()
app.use(morgan("dev"))
import env from "dotenv"
import cors from "cors"
import mongoose from "mongoose";
import Authrouter from "./routes/userroutes.js";
import { updateDetails } from "./controllers/userCon.js";
import cookieParser from "cookie-parser";
import Postrouter from "./routes/postroutes.js";
const stroage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/image');
  },

  


  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: stroage})
app.use(express.json({ limit: "50mb", extended: true }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(express.static("uploads"))
app.use(cookieParser())
app.use(cors({methods:["GET","POST","PUT","DELETE"],
  origin:"*",

}))

//routes
app.use("/auth",Authrouter)
app.use("/post",upload.single("image"),Postrouter)
app.put("/update/:id",upload.single("image"),updateDetails)

env.config()
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("database connected",PORT)
    }).catch((err) => {
        console.log(err)
    })
})