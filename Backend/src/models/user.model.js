const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true, "Username already taken."],
        required:[true, "Username is required."]
    }, 
    email:{
        type:String,
        unique:[true, "Email already registered."],
        required:[true, "Email is required."]
    },
    password:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;