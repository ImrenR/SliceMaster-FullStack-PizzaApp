"use strict";
const Token = require("../models/token");
const CustomError = require("../helpers/customError");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "aA12345.?",
                }
            }
        */
    // Implement login logic here

    const { username, email, password } = req.body;

    if (!(username || email) && !password)
      throw new CustomError("Username or email and password are required", 401);

    const user = await User.findOne({
      $or: [{ username }, { email }],
      password,
    }); // find user by username or email and password
    if (!user) throw new CustomError("Invalid username/email or password", 401);
    if (!user.isActive) throw new CustomError("User is not active", 401);
    
    /* Simple Token */
    /*  #to see whether the user has token  or not */

    let tokenData = await Token.findOne({ userId: user._id });
    if (!tokenData) {
      tokenData = await Token.create({
        userId: user._id,
        token: passwordEncrypt(Date.now() + user._id),
      });
    };

    /* Simple Token */

    /* JWT Token */
      // Access Token //
  const accessData = {
        _id: user._id,
        username: user.username,
        isActive: user.isActive,
        isAdmin: user.isAdmin
  }

//   const accessToken = jwt.sign(payload,secretKey,lifetime)

const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, {expiresIn: '15m'});
     // Refresh Token //:

     const refreshToken = jwt.sign({_id:user._id}, process.env.REFRESH_KEY,{expiresIn:'id'});

     /* JWT Token */
    res.status(200).send({
      error: false,
      bearer:{
        access:accessToken,
        refresh:refreshToken
      },
      token: tokenData.token,
      user:user
    });
  },

  logout: async (req, res) => {
   
    const auth =req.headers?.authorization;
    const tokenArr = auth ? auth.split(' ') : null;

    if(tokenArr && tokenArr[0] == 'Token') {
        const tokenData = await Token.deleteOne({token:tokenArr[1]})

    
    res.status(200).send({
      error: false,
      result,
      message: "Simple Token: Token deleted successfully",
    });

   }else if (tokenArr && tokenArr[0] == 'Bearer') {

     res.status(200).send({
        error: false,
        message: "JWT: No need any action for logout. Logout is automatic when token expired",
    })
  }
  },

  refresh: async (req, res) => {
   
    const {refresh} =req.body;

    if(!refresh) throw new CustomError("Refresh token is required", 401);

    const refreshData=jwt.verify(refresh,process.env.REFRESH_KEY);
    
    if(!refreshData) throw new CustomError('JWT Refresh Token is wrong.')

    const user = await User.findById(refreshData._id);
    if(!user) throw new CustomError('JWT Refresh Token data is broken');
    
    if(!user.isActive) throw new CustomError('User is not active.');

    const accessData = {
        _id: user._id,
        username: user.username,
        isActive: user.isActive,
        isAdmin: user.isAdmin
  }

const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, {expiresIn: '15m'});
        res.status(200).send({
      error: false,
      access: accessToken,
    });
  },
  // Add more functions as needed
};
