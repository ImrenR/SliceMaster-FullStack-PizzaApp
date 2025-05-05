'use strict'

const transporter = require("../configs/nodemailer");


module.exports = function sendMail(to,subject,message){
  transporter.sendMail({
  from: process.env.ADMIN_EMAIL,
  to,
  subject,
  html: message,
  text: message,
},function ( error, success) {
  success ? console.log('Email sent: ' , success) :
  console.log('Error: ' , error);
});
}