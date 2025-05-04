"use strict";
const { token } = require("morgan");
const CustomError = require("../helpers/customError");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const User = require("../models/user");

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

    let tokenData = await User.findOne({ userId: user._id });
    if (!tokenData) {
      tokenData = await Token.create({
        userId: user._id,
        token: passwordEncrypt(Date.now() + user._id),
      });
    }

    /* Simple Token */

    res.status(200).send({
      error: false,
      token: tokenData.token,
      message: "Login successful",
    });
  },
  logout: async (req, res) => {
    // Implement logout logic here
    res.status(200).send({
      error: false,
      message: "Logout successful",
    });
  },
  refresh: async (req, res) => {
    // Implement refresh logic here
    res.status(200).send({
      error: false,
      message: "Token refreshed successfully",
    });
  },
  // Add more functions as needed
};
