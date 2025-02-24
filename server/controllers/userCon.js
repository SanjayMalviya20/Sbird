import User from "../models/userSchema.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import Post from "../models/postSchema.js";

export const register = async (req, res) => {
  try {
    // Define the schema for input validation
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    });

    // Validate the input
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: "Invalid input",error });
    }

    const { name, username, password, email } = req.body;

    // Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      email,
    });

    // Return a success response
    res.status(201).json({ message: `Welcome ${user.name}` , user });
  } catch (error) {
    // Return a error response
    res.status(500).json({ error: "Failed to create user",error });
  }

};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    // Check if password is correct
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, "hellodon", 
    //   {
    //   // expiresIn: "1d",

    // }
);

    // Set cookie and send response
    res.status(200).cookie("token", token, {
      httpOnly: true,
      // expires: new Date(Date.now() + 900000),
    });
    res.json({ message: ` Welcome back ${user.name}`, user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export const logout=( req,res)=>{
  res.cookie("token","").json({message:"Logged out" })
}


export const getprofile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
  export const bookmarkspost = async (req, res) => {
    try {
      const { id } = req.params;
      const userid=req.params.userid
      if (!id) {
        return res.status(400).json({ message: 'Invalid request data' });
      }
      if (!userid) {
        return res.status(400).json({ message: 'Invalid request data' });
      }
      const user = await User.findById(userid); 
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }
      if (user.bookmarks.includes(id)) {
        user.bookmarks =  user.bookmarks.filter((bookmark) => bookmark!== id);
        await user.save();
        return res.status(200).json({user,id,message: 'post unbookmarked '});
      
      } else {
        user.bookmarks.push(id);
        await user.save();
        return res.status(200).json({message: 'post bookmarked' ,user,id});     
      }
  }

    catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });    
    }
  }


export const getalluser=async(req,res)=>{
  const {id}=req.params
  try {
    const users = await User.find({ _id: { $ne: id } }).select("-password");
    if (!users) {
      return res.status(404).json({ message: 'users not found' });
    }
    res.status(200).json({ users, message: 'users fetched successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const follow=async(req,res)=>{

  try {
    const {id}=req.params
    const {userid}=req.params
    const user = await User.findById(userid).select("-password");
    const friend = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    if (user.following.includes(id)) {
      user.following =  user.following.filter((e) => e!== id);
      friend.followers =  friend.followers.filter((e) => e!== userid);
      await user.save();
      return res.status(200).json({user,friend, message: 'unfollowed successfully' });
    
    } else {
      user.following.push(id);
      friend.followers.push(userid);
      await user.save();
      await friend.save();
      return res.status(200).json({message: 'followed successfully' ,user,friend});     
    }

}

  catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const getBookmarkspost = async (req, res) => {
  try {
    const { userid } = req.params; // Get the user ID from the request parameters

    if (!userid) {
      return res.status(400).json({ message: 'Invalid request data' });
    }
    

    const user = await User.findById(userid); // Find the user by ID
    if (!user) {
      return res.status(404).json({ message: 'User  not found' });
    }

    // Find all posts that are bookmarked by the user
    const bookmarkedPosts = await Post.find({ _id: { $in: user.bookmarks } });

    return res.status(200).json({ message: 'Bookmarked posts retrieved successfully', bookmarkedPosts });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};




  export const getbookmarks=async(req,res)=>{

    try {
    const  {id}=req.params
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }
      // const posts = await Post.find({ _id: { $in: user.bookmarks } });
      // res.status(200).json({ posts, message: 'bookmarks fetched successfully' });
      const post =await Promise.all(user.bookmarks.map(async (bookmark) => await Post.findById(bookmark)));
      res.status(200).json({ post, message: 'bookmarks  successfully' });
   
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }

  }
  export const updateDetails = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, username, bio, picType } = req.body;
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).send({ message: 'User  not found' });
      }
  
      user.name = name || user.name;
      user.username = username || user.username;
      user.bio = bio || user.bio;
  
      if (req.file) {
        if (picType === 'profilepic') {
          user.profilePic = req.file.filename;
        } else if (picType === 'coverpic') {
          user.coverPic = req.file.filename;
        } else {
          return res.status(400).send({ message: 'Invalid picType' });
        }
      }
  
      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error updating user details' });
    }
  };
