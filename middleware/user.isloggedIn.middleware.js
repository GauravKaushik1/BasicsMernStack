
const jwt = require("jsonwebtoken");
const User = require('../models/User.Model');
require('dotenv').config({
    path: './config/config.env'
});



const isLoggedInMiddleware = async(req, res, next) => {
    const token = req.header('Authorization');
    if(!token){
        return res
        .status(401)
        .json({message: "Unauthorized HTTP, Token not provided"});
    }
    console.log("token from middleware is logged in :" , token);
    
    
    
    const jwtToken = token.replace("Bearer","").trim();
    console.log("token from user IsloggedIn middleware", jwtToken);


    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        console.log("jwt verification by is loggedin middleware",isVerified);
        const userData = await User.findOne({ email: isVerified.email }).select({
            password: 0,//projection using select to get selective attributes to exclude some objects you may also use "-password -token "
          });
        if (!userData) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        
          req.token = token;
          req.user = {//to send the data to next middleware or controller to check and use for example admin check middleware
            user_id:userData.id, 
            username:userData.username, 
            email:userData.email, 
            phone:userData.phone, 
            password:userData.password, 
            firstName:userData.fullName.firstName, 
            middleName:userData.fullName.middleName, 
            lastName:userData.fullName.lastName.filter(str => str.trim() != "").join(" "), 
            profile_Pic:userData.profile_Pic, 
            refreshToken:userData.refreshToken, 
            isAdmin:userData.isAdmin, 
            roles:userData.roles, 
            
            userId: userData._id.toString(),
            createdAt:userData.createdAt,
            updatedAt:userData.updatedAt
        };
          req.userID = userData._id;
         
        next();//to go to the next middleware of route or the controller
    } catch (error) {
        return res.status(401).json({message: "Unauthorized. Invalid token. in isLoggedIn middleware"});
    }
}
const authMiddleware = async(req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization").trim()?.replace("Bearer", "").trim() || req.headers.authorization?.split(' ')[1];
     
    if (!token) return res.status(401).json({ message: 'No token provided' });
  
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
      if(!user){
        res.status(401, { message: 'Invalid access token'});
      }
      req.user = user;
      
      next();
    } catch (error) {
      res.status(401).json({ message: error?.message || 'Invalid access token' });
    }
  };
  
module.exports = {
  isLoggedInMiddleware, 
  authMiddleware
};