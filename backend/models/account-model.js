const mongoose = require("mongoose");
const User = require('./user-model')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const accountSchema = new mongoose.Schema({


    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true,
    }

});


// Define MODEL or Collection Name

const Account = new mongoose.model("Account", accountSchema); //will create a collection named as users('s' will be automatically inserted at last ) and will follow the schema defined above with the fields.

module.exports = Account;
