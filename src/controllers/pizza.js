"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Pizza = require("../models/pizza.js");

module.exports = {
  list: async (req, res) => {
    /* 
          
    #swagger.ignore = true
        */

    const result = await res.getModelList(Pizza);

    res.status(200).send({
      error: false,
      details: await getModelListDetails(Pizza),
      result,
    });
  },

  create: async (req, res) => {
     /* 
          
    #swagger.ignore = true
        */
  // To be added after Pizza
    const result = await Pizza.create(req.body);

    res.status(201).send({
      error: false,
      result,
    });
  },

  read: async (req, res) => {
    /* 
          
    #swagger.ignore = true
        */
  const result= await Pizza.findOne({_id:req.params.id}, populate(["userId","pizzaId"]));

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
     /* 
          
    #swagger.ignore = true
        */
    const result= await Pizza.findByIdAndUpdate({ _id: req.params.id},req.body,{runValidators:true,new:true})
// runValidators:true will run the validators on the updated data
// new:true will return the updated data
// if you don't use new:true, it will return the old data
    
    res.status(200).send({
      error: false,
     result,
    });
  },
  delete: async (req, res) => {

  /*  #swagger.tags = ['Pizzas']
            #swagger.summary = 'Delete Pizzas'  
    */
    const result= await Pizza.deleteOne({ _id: req.params.id});
// deleteOne will delete the document and return the result
// if you want to delete multiple documents, use deleteMany
    res.status(result.deletedCount ? 204 : 404).send({ 
      error: !deletedCount,
     result,
    });
  },
};