"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Pizza = require("../models/pizza.js");

module.exports = {
  list: async (req, res) => {
    const result = await res.getModelList(Pizza, {}, "toppingIds");

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Pizza),
      result,
    });
  },

  create: async (req, res) => {

    /* 
    #swagger.ignore = true
        */

    req.body.toppingIds = [...new Set(req.body.toppingIds)];
    // this will remove duplicates from the array

    if(req.file){
      req.body.image = req.file.filename
    }
    
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
    const result = await Pizza.findOne(
      { _id: req.params.id },
      populate("toppingIds")
    );
    // populate will replace the toppingIds with the actual data from the Topping model;
    // this will return the pizza with the toppingIds replaced with the actual data
    // if you want to populate multiple fields, use populate({ path: "field1 field2" })

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    /*    
    #swagger.ignore = true
    */

    const result = await Pizza.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    if (!result.modifiedCount) {
      res.errorStatusCode = 404;
      throw new Error("Pizza not found");
    }

    res.status(200).send({
      error: false,
      result,
    });
  },
  delete: async (req, res) => {
    /*  #swagger.tags = ['Pizzas']
            #swagger.summary = 'Delete Pizzas'  
    */
    const result = await Pizza.deleteOne({ _id: req.params.id });
    res.status(result.deletedCount ? 204 : 404).send({
      error: !deletedCount,
      result,
    });
  },
};
