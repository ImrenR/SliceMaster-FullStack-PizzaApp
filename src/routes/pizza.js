"use strict";
/* ------------------------------------------------------- */

const router = require("express").Router();
const pizza = require("../controllers/pizza");
/* ------------------------------------------------------- */
//UPLOAD (MULTER MIDDLEWARE)
// npm i multer

const multer = require("multer");

const upload = multer({
  // dest:'./uploads/', // destination of images  
  storage: multer.diskStorage({
    destination: './uploads',
    filename: function(req,file,cb) {
      cb(null,Date.now() + '_'  + file.originalname)
    }
  }), 
});

/* ------------------------------------------------------- */
router.route("/")
.get(pizza.list)
.post(upload.single('image'),pizza.create);

router
  .route("/:id")
  .get(pizza.read)
  .put(pizza.update)
  .patch(pizza.update)
  .delete(pizza.delete);
/* ------------------------------------------------------- */
module.exports = router;
/* ------------------------------------------------------- */
