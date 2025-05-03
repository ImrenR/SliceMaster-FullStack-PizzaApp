"use strict";

const router = require("express").Router();
const user = require("../controllers/userController");
/* ------------------------------------------------------- */
router.route("/").get(user.list).post(user.create);

router
  .route("/:id")
  .get(user.read)
  .put(user.update)
  .patch(user.update)
  .delete(user.deleteUser);
/* ------------------------------------------------------- */
module.exports = router;
