const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    }
    ,
    email:{
        type:String,
        required:true
    }
    ,password:{
        type:String,
        required:true
    }
},{timestamps:true})

//create collection
const UserModel = mongoose.model('user',UserSchema)  //collection name:blog , collection field:blogschema

module.exports = UserModel