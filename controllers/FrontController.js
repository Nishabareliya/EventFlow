const blogmodel = require('../models/Blog')
const categorymodel = require('../models/Category')
const aboutusmodel = require('../models/Aboutus')
const contactmodel = require('../models/Contact')
const BlogModel = require('../models/Blog')
const usermodel = require('../models/user')

class FrontController{
    
    static home = async(req,res)=>{
        try{
            const {name,email} = req.user
            const data = await blogmodel.find().sort({_id:-1}).limit(6)
            res.render('home',{b:data,e:email})
        }catch(error){
            console.log(error)
        }
    }
    static premiumpagecall = async(req,res)=>{
        try{
            res.render('premiumpage');
        }catch(error){
            console.log(error)
        }
    }

    static readmore = async(req,res)=>{
        try{
            const data = await blogmodel.findById(req.params.id)
            const blogdata = await blogmodel.find().limit(6)
            const categorydata =  await categorymodel.find().sort({_id:-1}).limit(6)
            res.render('readmore',{d:data,b:blogdata,c:categorydata})

        }catch(error){
            console.log(error)
        }
    }

    static about = async(req,res)=>{
        try{
            const data  = await aboutusmodel.find()
            console.log(data)
            res.render('about',{d:data})
        }catch(error){
            console.log(error)
        }
    }
    
    static contact = (req,res)=>{
        try{
            res.render('contact')
        }
        catch(error){
            console.log(error)
        }
    }

    static insertcontactdata = async(req,res)=>{
        try {
            const result  = new contactmodel({
                fname:req.body.fname,
                lname:req.body.lname,
                email:req.body.email,
                number:req.body.number,
                query:req.body.query
            })
            await result.save()
            res.redirect('/contact')
        }
        catch (error) {
            console.log(error);
        }
    }

    static blog = async(req,res)=>{
        try{
            const data = await blogmodel.find()
            res.render('blog',{message:req.flash('success'),d:data})
        }catch(error){
            console.log(error)
        }
    }

    static login= async(req,res)=>{
        try{
            
            res.render('login',{message:req.flash("success"),error:req.flash("error")})
        }catch(error){
            console.log(error)
        }
    }
    static register= async(req,res)=>{
        try{
            res.render('register',{message:req.flash('error')})
        }catch(error){
            console.log(error)
        }
    }

    static getallblogs = async (req,res)=>{
        try{
            const blogs = await blogmodel.find();
            res.send(blogs);
        }catch(error){
            console.log(error)
        }
    }
    static getallblogsbyid = async (req,res)=>{
        try{
            const data = await blogmodel.findById(req.params.id);
            res.send(data);
        }catch(error){
            console.log(error)
        }
    }
}

module.exports=FrontController