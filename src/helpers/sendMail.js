'use strict'

function sendMail(){
  transporter.sendMail({
  from: 'imrenrahbay@gmail.com',
  to: 'irahbay@gmail.com',
  subject: 'Test Email',
  html: '<h1>Hello</h1><p>Test Email</p>',
  text: 'Test Email',
},function ( error, success) {
  success ? console.log('Email sent: ' , success) :
  console.log('Error: ' , error);
});
}