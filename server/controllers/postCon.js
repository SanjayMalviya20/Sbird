import Post from "../models/postSchema.js";
import User from "../models/userSchema.js";

export const create = async (req, res) => {
    try {
      const { id } = req.params;
      const { desc } = req.body;
      // Validate the request data
      if (!id || !desc) {
        return res.status(400).json({ message: 'Invalid request data' });
      }
  
      // Create a new post
      const newPost = await Post.create({
        userid: id,
        desc,
        image: req.file ? req.file.filename : ''
      });
  
      // Return the newly created post
      res.status(201).json(newPost);
    } catch (error) {
      // Return a  error message to the client
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


 export const deletePost = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate the request data
      if (!id) {
        return res.status(400).json({ message: 'Invalid request data' });
      }
  
      // Delete the post
      const deletedPost = await Post.findByIdAndDelete(id);
  
      // Return the deleted post
      res.status(200).json({deletedPost,message:"post deleted successfully"});
    } catch (error) {
      // Return a  error message to the client
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  export const likepost = async (req, res) => {
    try {
      const { id } = req.params;
      const userid=req.params.userid
      if (!id) {
        return res.status(400).json({ message: 'Invalid request data' });
      }
      if (!userid) {
        return res.status(400).json({ message: 'Invalid request data' });
      }
      const post = await Post.findById(id); 
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      if (post.likes.includes(userid)) {
        post.likes =  post.likes.filter((like) => like!== userid);
        await post.save();
        return res.status(200).json({ message: 'Post unliked successfully' });
      
      } else {
        post.likes.push(userid);
        await post.save();
        return res.status(200).json({ message: 'Post liked successfully' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });    
    }
  }

  
export const getallposts = async (req, res) => {
  try {
    const {id}=req.params
    const user = await User.findById(id);
    const userpost=await Post.find({userid:id})
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    const friendpost=await Promise.all(user.following.map(async (friendid) => await Post.find({userid:friendid})));
    const posts = userpost.concat(...friendpost);
    res.status(200).json(posts.sort((a, b) => b.createdAt - a.createdAt));
    
  } catch (error) {
    
  }
}



export const followingpost = async (req, res) => {
  try {
    const {id}=req.params
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    const friendpost=await Promise.all(user.following.map(async (friendid) => await Post.find({userid:friendid})));
    res.status(200).json(friendpost.flat().sort((a, b) => b.createdAt - a.createdAt));
    
  } catch (error) {
    
  }
}

// export const followingpost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json({ message: 'User  not found' });
//     }

//     const followingUsersWithPosts = await Promise.all(
//       user.following.map(async (friendId) => {
//         const friend = await User.findById(friendId);
//         const posts = await Post.find({ userid: friendId });

//         return {
//           user: {   
//             friend,
//            posts
//           },
//         };
//       })
//     );
    // const sortedPosts = followingUsersWithPosts.flatMap((userWithPosts) => userWithPosts)
    // .sort((a, b) => b.createdAt - a.createdAt);

//   res.status(200).json(followingUsersWithPosts);

// } catch (error) {
//   console.error(error);
//   res.status(500).json({ message: 'Internal Server Error' });
// }
// }
//   export const likepost = async (req, res) => {
//     try {
//         const postId = req.params.id;
//         const userid = req.params.userid;
        
//         if (!postId) {
//             return res.status(400).json({ error: 'Post ID is required' });
//         }

//         const post = await Post.findById(postId).exec();
//         if (!post) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         if (!post.likes.includes(userid)) {
//             await post.updateOne({ $push: { likes:userid } });
//             res.status(200).json({message: "The post has been liked"});
//         } else {
//             await post.updateOne({ $pull: { likes:userid } });
//             res.status(200).json({message: "The post has been disliked"});
//         }
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// }



