const mongoose = require('mongoose')

//define schema (field)
const CategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    postdate:{
        type:Date,
        required:true
    }
    ,
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
const CategoryModel = mongoose.model('category',CategorySchema)  //collection name:categiry , collection field:Categoryschema

module.exports = CategoryModel