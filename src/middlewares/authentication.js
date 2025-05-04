"use strict"

const Token = require("../models/token");
const jwt = require("jsonwebtoken");

 module.exports = async (req, res, next) => {
    
    req.user = null;

    const auth = req.headers?.authorization; // Token ... TokenKey..|| Bearer ... AccessToken...
    const tokenArr= auth ? auth.split(" ") : null;
/* Compareson of Simple Token and JWT */
   // Whenever user have a request, we make a request to DB according to Simple Token
   // However we dont send a request to DB in JWT
   // We just verify the token
    // If the token is valid, we can get the user information from the token
    // Simple Token is used to get the user information from the DB
    // JWT is used to verify the token and get the user information from the token
    // If the token is valid, we can get the user information from the token
    // If the token is not valid, we can get the user information from the DB
/*---------------------------------------------------------*/
    if(tokenArr && tokenArr[0] =='Token'){ 
        const tokenData = await Token.findOne({token:tokenArr[1]}).populate('userId'); //{userId,token}
        req.user=tokenData ? tokenData.userId : null ;
    } else if(tokenArr && tokenArr[0] =='Bearer'){ 
        jwt.verify(tokenArr[1],process.env.ACCESS_KEY,(error, accessData) => {
        console.log('accessData:',accessData);
        console.log('error:',error);
        req.user =accessData ? accessData : null ;// to update req.user
        });
    }
    
        next();
 }