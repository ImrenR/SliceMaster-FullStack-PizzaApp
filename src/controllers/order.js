"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const Order = require("../models/order");
const Pizza = require("../models/pizza");
module.exports = {
  list: async (req, res) => {
    /* 
          
    #swagger.ignore = true
        */

    const result = await res.getModelList(Order);

    res.status(200).send({
      error: false,
      details: await getModelListDetails(Order),
      result,
    });
  },

  create: async (req, res) => {
     /* 
          
    #swagger.ignore = true
        */
    const pizza  = await Pizza.findOne({ _id: req.body.pizzaId });
    if (!pizza) {
      return res.status(404).send({
        error: true,
        message: "Pizza not found",
      });
    }
    req.body.price= pizza.price;
    //This means that the price of the order will be the same as the price of the pizza
    
    const result = await Order.create(req.body);

    res.status(201).send({
      error: false,
      result,
    });
  },

  read: async (req, res) => {
    /* 
          
    #swagger.ignore = true
        */
  const result= await Order.findOne({_id:req.params.id}, populate(["userId","pizzaId"]));

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
     /* 
          
    #swagger.ignore = true
        */
    const result= await Order.findByIdAndUpdate({ _id: req.params.id},req.body,{runValidators:true,new:true})
// runValidators:true will run the validators on the updated data
// new:true will return the updated data
// if you don't use new:true, it will return the old data
    
    res.status(200).send({
      error: false,
     result,
    });
  },
  delete: async (req, res) => {

  /*  #swagger.tags = ['Orders']
            #swagger.summary = 'Delete Orders'  
    */
    const result= await Order.deleteOne({ _id: req.params.id});
// deleteOne will delete the document and return the result
// if you want to delete multiple documents, use deleteMany
    res.status(result.deletedCount ? 204 : 404).send({ 
      error: !deletedCount,
     result,
    });
  },
};
