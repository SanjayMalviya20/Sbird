import jwt from "jsonwebtoken"


export const vailduser = async (req, res, next) => {
    try {
      // Extract token from cookies
      const token =await req.cookies.token
      // Check if token exists
      if (!token) {
        return res.status(401).json({ message: "Please login" });
      }
      const user = await jwt.verify(token,"hellodon");
      req.user = user.id;
      // Log user data for debugging purposes
      console.log(user);
      // Call next middleware function
      next();
    } catch (error) {
      // Handle token verification error
      console.error("Token verification error:", error);
      return res.status(401).json({ message: "Invalid token" });
    }
  };
  export default vailduser
  