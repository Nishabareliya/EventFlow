const contactmodel = require('../../models/Contact')

class ContactController{
    static contactdisplay= async(req,res)=>{
        try{
            const data = await contactmodel.find()
            res.render('Admin/contact/display',{d:data});
        }catch(error){
            console.log(error)
        }
    }
    static contactview = async(req,res) => {
        try{
            const data = await contactmodel.findById(req.params.id)
            res.render('Admin/contact/view',{view:data})
        }catch(error){
            console.log(error)
        }
    }

    static deletecontact = async(req,res)=>{
        try{
            const data  = await contactmodel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/contact/display')
        }catch(error){
            console.log(error)
        }
    }
}




module.exports = ContactController