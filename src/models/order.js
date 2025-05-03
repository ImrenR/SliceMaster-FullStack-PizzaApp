"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      trim: true,
      required: true,
      unique: true,
    },
    pizzaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      trim: true,
      required: true,
    },
    size: {
      type: String,
      trim: true,
      required: true,
      enum: ["small", "medium", "large"], 
      //enum means the value must be one of the specified values
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: function(){
        return this.price * this.quantity;
      }
    },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);
/* ------------------------------------------------------- */
module.exports = mongoose.model("Order", OrderSchema);
/* ------------------------------------------------------- */
