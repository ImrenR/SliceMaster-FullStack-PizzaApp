"use strict";

/* ------------------------------------------------------- */
//UPLOAD (MULTER MIDDLEWARE)
// npm i multer
/* ------------------------------------------------------- */
const multer = require("multer");

module.exports = multer({
  // dest:'./uploads/', // destination of images  
  storage: multer.diskStorage({
    destination: './uploads',
    filename: function(req,file,cb) {
      cb(null,Date.now() + '_'  + file.originalname)
    }
  }), 
});