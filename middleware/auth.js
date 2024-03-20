const jwt = require('jsonwebtoken')
const usermodel = require('../models/user')



const checkAdminAuth = async(req,res,next) =>{
    // console.log("middleware")
    const {token} = req.cookies
    // console.log(token)
    if(!token){
        req.flash('error','unauthorized user')
        res.redirect('/');
    }
    else{
        const data = jwt.verify(token,
            'pragyanshutayal1234')
        console.log(data)
        const user = await  usermodel.findOne({_id:data.id})
        req.user = user
        next()
    }
}


module.exports = checkAdminAuth