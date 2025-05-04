"use strict"

const Token = require("../models/token");
const jwt = require("jsonwebtoken");
 module.exports = async (req, res, next) => {
    

    req.user = null;

    const auth = req.headers?.authorization; 
    const tokenArr= auth ? auth.split(" ") : null;
    if(tokenArr && tokenArr[0] =='Token'){
        const tokenData = await Token.findOne({token:tokenArr[1]}).populate('userId'); //{userId,token}
        req.user=tokenData ? tokenData.userId : null ;
    } else if(tokenArr && tokenArr[0] =='Bearer'){
        jwt.verify(tokenArr[1],process.env.ACCESS_KEY,(error, accessData) => {

        });
    }
    
        next();
 }