"use strict"

const { mongoose } = require('../configs/dbConnection')
const passwordEncrypt = require('../helpers/passwordEncrypt')
/* ------------------------------------------------------- */

const userSchema = new mongoose.Schema({
    
    username:{
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        trim:true,
        required: true,
        set:(password)=>passwordEncrypt(password),
        // validate will be added in controller
    },
    email:{
        type: String,
        trim:true,
        required: true,
        unique: true,
        validate:[(email)=> /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email), "Please enter a valid email address"],
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },

},{
    collection: 'users',
    timestamps: true,
})

module.exports= mongoose.model('User', userSchema)