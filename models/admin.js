const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({

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
const AdminModel = mongoose.model('admin',AdminSchema)  //collection name:blog , collection field:blogschema

module.exports = AdminModel