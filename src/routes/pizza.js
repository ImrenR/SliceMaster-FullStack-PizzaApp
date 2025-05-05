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
    

  })


  
});




/* ------------------------------------------------------- */
router.route("/").get(pizza.list).post(pizza.create);

router
  .route("/:id")
  .get(pizza.read)
  .put(pizza.update)
  .patch(pizza.update)
  .delete(pizza.delete);
/* ------------------------------------------------------- */
module.exports = router;
/* ------------------------------------------------------- */
