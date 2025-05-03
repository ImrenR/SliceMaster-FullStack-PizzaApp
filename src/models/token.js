"use strict"
/* ------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */
const TokenSchema = new mongoose.Schema({
     
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true,
        unique: true
    },
    token:{
        type: String,
        required: true,
        trim: true,
        unique: true
    }


},{
    collection: 'tokens',
    timestamps: true    
})

module.exports = mongoose.model('Token', TokenSchema)