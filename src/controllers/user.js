"use strict";

const User = require("../models/user");

const sendMail = require("../helpers/sendMail");

module.exports = {
  list: async (req, res) => {
    /* 
            #swagger.tags = ['Users']
            #swagger.summary = 'List Users'
            #swagger.desription = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples usage:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

    const result = await res.getModelList(User);

    res.status(200).send({
      error: false,
      details: await getModelListDetails(User),
      result,
    });
  },

  create: async (req, res) => {
    /*  #swagger.tags = ['Users']
            #swagger.summary = 'Create Users'  
    */

    // Password validation
    if (
      !!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
        req.body.password)
    ) {
      res.errorStatusCode = 401;
      throw new Error("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character");
    }
    const result = await User.create(req.body);

    if(result){
      sendMail(result.email, "Welcome to our service", `
        <h1>Welcome to our service</h1>
        <p>Dear ${result.username}</p>
        <p>Verif your email </p>
        `);
        }

    res.status(201).send({
      error: false,
      result,
    });
  },

  read: async (req, res) => {
    /*  #swagger.tags = ['Users']
            #swagger.summary = 'Read Users'  
    */
  const result= await User.findById({_id:req.params.id});

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    /*  #swagger.tags = ['Users']
            #swagger.summary = 'Update Users'  
    */

    const result= await User.findByIdAndUpdate({ _id: req.params.id},req.body,{runValidators:true,new:true})
// runValidators:true will run the validators on the updated data
// new:true will return the updated data
// if you don't use new:true, it will return the old data
    
    res.status(200).send({
      error: false,
     result,
    });
  },
  deleteUser: async (req, res) => {

  /*  #swagger.tags = ['Users']
            #swagger.summary = 'Delete Users'  
    */
    const result= await User.deleteOne({ _id: req.params.id});
// deleteOne will delete the document and return the result
// if you want to delete multiple documents, use deleteMany
    res.status(result.deletedCount ? 204 : 404).send({ 
      error: !deletedCount,
     result,
    });
  },
};
//deletedCount will return the number of documents deleted
