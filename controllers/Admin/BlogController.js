const blogmodel = require('../../models/Blog')
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dktgryqww', 
  api_key: '715399379548124', 
  api_secret: 'kwvSM0qB36pvk90Dyqufj-pLSLQ',
//   secure: true
});


class BlogController {

    static displayblog = async(req, res) => {
        try{
            const {email} = req.user
            const data = await blogmodel.find()
            // console.log(data)
            res.render('Admin/blog/display',{d:data,e:email})
        }catch(error){
            console.log(error)
        }
    }

    static insertblog = async (req, res) => {
        try {
            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                folder:'blogImage'
            })
            const result  = new blogmodel({
                title:req.body.title,
                description:req.body.description,
                image:{
                    public_id:myimage.public_id,
                    url:myimage.secure_url
                }
            })
            // console.log(myimage);
            // const result  = await blogmodel.create(req.body)  //create means insert
            // const result = new blogmodel({
            //     title:req.body.title,
            //     description:req.body.description
            // })
            await result.save()
            res.redirect('admin/blog/display')
        }
        catch (error) {
            console.log(error);
        }
    }

    static insertuserblog = async (req, res) => {
        try {
            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                folder:'blogImage'
            })
            const result  = new blogmodel({
                title:req.body.title,
                description:req.body.description,
                image:{
                    public_id:myimage.public_id,
                    url:myimage.secure_url
                }
            })
            req.flash('success',"Your Blog Has Been Uploaded Successfully")
            await result.save()
            res.redirect('blog')
        }
        catch (error) {
            console.log(error);
        }
    }

    static blogview = async(req,res) => {
        try{
            // console.log(req.params.id)
            const data = await blogmodel.findById(req.params.id)
            // console.log(data)
            res.render('Admin/blog/view',{view:data})
        }catch(error){
            console.log(error)
        }
    }
    static blogedit = async(req,res) => {
        try{
            // console.log(req.params.id)
            const data = await blogmodel.findById(req.params.id)
            // console.log(data)
            res.render('Admin/blog/edit',{edit:data})
        }catch(error){
            console.log(error)
        }
    }

    static updateblog = async (req,res)=>{
        try{

            if(!req.files){
                const result = await blogmodel.findByIdAndUpdate(req.params.id,{
                    title:req.body.title,
                    description:req.body.description
                })
                await result.save()
            }
            else{  
                //delete image
                const blog = await blogmodel.findById(req.params.id)
                const imageid = blog.image.public_id
                await cloudinary.uploader.destroy(imageid)

                //update image
                const file = req.files.image
                const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                    folder:'blogImage'
                })


                const result = await blogmodel.findByIdAndUpdate(req.params.id,{
                    title:req.body.title,
                    description:req.body.description,
                    image:{
                        public_id:myimage.public_id,
                        url:myimage.secure_url
                    }
                })
                await result.save()
            }

            res.redirect("/admin/blog/display")
        }
        catch(error){
           console.log(error)
        }
    }
    static deleteblog = async (req,res)=>{
        try{
            //delete image from server
            const blog = await blogmodel.findById(req.params.id)
            const imageid = blog.image.public_id
            await cloudinary.uploader.destroy(imageid)
            
            
            await blogmodel.findByIdAndDelete(req.params.id)
            res.redirect("/admin/blog/display")
        }
        catch(error){
           console.log(error)
        }
    }
}

module.exports = BlogController