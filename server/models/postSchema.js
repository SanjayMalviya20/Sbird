import mongoose from "mongoose";

const post = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    desc: {
        type: String,

    },
    image: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    },

}, { timestamps: true })
const Post = mongoose.model("Post", post)
export default Post