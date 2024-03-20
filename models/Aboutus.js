const mongoose = require('mongoose')


//define schema (field)
const AboutUsSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    image:{
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    }
},{timestamps:true})

//create collection
const AboutUsModel = mongoose.model('aboutus',AboutUsSchema)  //collection name:blog , collection field:blogschema

module.exports = AboutUsModel