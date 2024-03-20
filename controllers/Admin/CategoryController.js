const categorymodel = require('../../models/Category')
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dktgryqww', 
  api_key: '715399379548124', 
  api_secret: 'kwvSM0qB36pvk90Dyqufj-pLSLQ',
//   secure: true
});


class CategoryController{

    static categorydisplay= async (req,res)=>{
        try{
            const data = await categorymodel.find()
            // console.log(data)
            res.render('Admin/category/display',{d:data})
        }catch(error){
            console.log(error)
        }
    }
    
    static insertcategory = async (req, res) => {
        try {
            // console.log(req.body);
            // const result  = await blogmodel.create(req.body)  //create means insert
            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                folder:'CategoryImage'
            })
            const result = new categorymodel({
                title:req.body.title,
                description:req.body.description,
                postdate:req.body.postdate,
                image:{
                    public_id:myimage.public_id,
                    url:myimage.secure_url
                }
            })
            await result.save()
            res.redirect('admin/category/display')
        }
        catch (error) {
            console.log(error);
        }
    }

    static categoryview = async(req,res) => {
        try{
            // console.log(req.params.id)
            const data = await categorymodel.findById(req.params.id)
            // console.log(data)
            res.render('Admin/category/view',{view:data})
        }catch(error){
            console.log(error)
        }
    }
    static categoryedit = async(req,res) => {
        try{
            // console.log(req.params.id)
            const data = await categorymodel.findById(req.params.id)
            // console.log(data)
            res.render('Admin/category/edit',{edit:data})
        }catch(error){
            console.log(error)
        }
    }

    static updatecategory = async (req,res)=>{
        try{
            if(!req.files){
                const result = await categorymodel.findByIdAndUpdate(req.params.id,{
                    title:req.body.title,
                    description:req.body.description,
                    postdate:req.body.postdate
                })
                await result.save()
            }
            else{  
                //delete image
                const data = await categorymodel.findById(req.params.id)
                const imageid = data.image.public_id
                await cloudinary.uploader.destroy(imageid)

                //update image
                const file = req.files.image
                const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                    folder:'CategoryImage'
                })

                const result = await categorymodel.findByIdAndUpdate(req.params.id,{
                    title:req.body.title,
                    description:req.body.description,
                    postdate:req.body.postdate,
                    image:{
                        public_id:myimage.public_id,
                        url:myimage.secure_url
                    }
                })
                await result.save()
            }
            res.redirect("/admin/category/display")
        }
        catch(error){
           console.log(error)
        }
    }
    static deletecategory = async (req,res)=>{
        try{
             //delete image from server
            const data = await categorymodel.findById(req.params.id)
            const imageid = data.image.public_id
            await cloudinary.uploader.destroy(imageid)

            await categorymodel.findByIdAndDelete(req.params.id)
            res.redirect("/admin/category/display")
        }
        catch(error){
           console.log(error)
        }
    }
}

module.exports = CategoryController