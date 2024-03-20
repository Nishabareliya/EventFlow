const usermodel = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


class AdminController {

    static dashboard = async(req, res) => {
        try{
            const {name,email} = req.user
            res.render('Admin/Dashboard',{n:name,e:email})
        }catch(error){
            console.log(error)
        }
    }
    static displayblog = (req, res) => {
        res.render('Admin/displayblog')
    }

    static register = async (req, res) => {
        try {
            const { name, email, password, confirmpassword } = req.body

            const admin = await usermodel.findOne({ email: email })

            if (admin) {
                req.flash('error', 'Email already exsits')
                res.redirect('/register')
            }
            else {

                if (name && email && password && confirmpassword) {
                    if (password == confirmpassword) {

                        const hashpassword = await bcrypt.hash(password,10)
                        const data = await new usermodel({
                            name: name,
                            email: email,
                            password: hashpassword
                        })
                        data.save()
                        req.flash("success","Succesfully Registered")
                        res.redirect('/')
                    }
                    else {
                        req.flash('error', 'Password and confirm password does not match')
                        res.redirect('/register')
                    }
                }
                else {
                    req.flash('error', 'All field are required')
                    res.redirect('/register')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    static login = async(req,res)=>{
        try{
            const {email, password} = req.body
            if(email && password)
            {   
                const admin = await usermodel.findOne({ email: email })
                if(!admin){
                    req.flash('error', 'You are not a Registered user')
                    res.redirect('/')
                }
                else{
                    const ismatched = await bcrypt.compare(password,admin.password)
                    if(ismatched){
                        //generate json web token
                        const token = jwt.sign({id:admin._id},'pragyanshutayal1234')
                        // console.log(token)
                        res.cookie('token',token)
                        res.redirect('/home')
                    }
                    else{
                        req.flash('error', 'Wrong Email or Password entered')
                        res.redirect('/')
                    }
                }
            }
            else{
                req.flash('error', 'All fields are required')
                res.redirect('/')
            }
        }
        catch(error){
            console.log(error)
        }
    }
    static logout = async(req,res)=>{
        try{
            res.clearCookie('token')
           res.redirect('/')
        }
        catch(error){
            console.log(error)
        }
    }
}

module.exports = AdminController