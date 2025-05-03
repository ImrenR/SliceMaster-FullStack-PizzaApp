"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const PizzaSchema=new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
      },
      
      image:String,

      price:{
        type:Number,
        required:true
      },

      
      toppingIds:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Topping"
        }
      ]


},{collection:"pizzas",timestamps:true})

module.exports=mongoose.model("Pizza",PizzaSchema)