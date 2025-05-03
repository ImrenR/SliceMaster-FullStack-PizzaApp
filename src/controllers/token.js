"use strict";
const { Token } = require("../models/token");

module.exports = {
  list: async (req, res) => {
    /* 
   #swagger.ignore=true
   */

    const result = await res.getModelList(Token);

    res.status(200).send({
      error: false,
      details: await getModelListDetails(Token),
      result,
    });
  },

  create: async (req, res) => {
    /* 
   #swagger.ignore=true
   */

    const result = await Token.create(req.body);

    res.status(201).send({
      error: false,
      result,
    });
  },

  read: async (req, res) => {
    /* 
   #swagger.ignore=true
   */
    const result = await Token.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
   
/*
   #swagger.ignore=true
 */

    const result = await Token.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { runValidators: true, new: true }
    );
    // runValidators:true will run the validators on the updated data
    // new:true will return the updated data
    // if you don't use new:true, it will return the old data

    res.status(200).send({
      error: false,
      result,
    });
  },
  delete: async (req, res) => {
    /* 
   #swagger.ignore=true
   */
  
    const result = await Token.deleteOne({ _id: req.params.id });
    // deleteOne will delete the document and return the result
    // if you want to delete multiple documents, use deleteMany
    res.status(result.deletedCount ? 204 : 404).send({
      error: !deletedCount,
      result,
    });
  },
};
//deletedCount will return the number of documents deleted
