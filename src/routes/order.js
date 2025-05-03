"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
const order = require("../controllers/order");
/* ------------------------------------------------------- */
router.route("/").get(order.list).post(order.create);

router
  .route("/:id")
  .get(order.read)
  .put(order.update)
  .patch(order.update)
  .delete(order.delete);
/* ------------------------------------------------------- */
module.exports = router;
/* ------------------------------------------------------- */
