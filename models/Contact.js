const mongoose = require('mongoose')


//define schema (field)
const ContactSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    }
    ,
    query:{
        type:String,
        required:true
    }
},{timestamps:true})

//create collection
const ContactModel = mongoose.model('contact',ContactSchema)  //collection name:blog , collection field:blogschema

module.exports = ContactModel