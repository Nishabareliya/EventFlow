const aboutusmodel = require('../../models/Aboutus')
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dktgryqww', 
  api_key: '715399379548124', 
  api_secret: 'kwvSM0qB36pvk90Dyqufj-pLSLQ',
//   secure: true
});

class AboutController{
    static aboutdisplay= async(req,res)=>{
        try{
            console.log("dsfgghf...")
            const data = await aboutusmodel.find()
            console.log(data)
            res.render('Admin/about/display',{d:data})
        }catch(error){
            console.log(error)
        }
        
    }

    // static insertaboutus = async (req, res) => {
    //     try {
    //         const file = req.files.image
    //         const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
    //             folder:'AboutUsImage'
    //         })
    //         const result  = new aboutusmodel({
    //             content:req.body.content,
    //             image:{
    //                 public_id:myimage.public_id,
    //                 url:myimage.secure_url
    //             }
    //         })
    //         await result.save()
    //         res.redirect('admin/about/display')
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }

    static aboutusedit = async(req,res) => {
        try{
            // console.log(req.params.id)
            const data = await aboutusmodel.findById(req.params.id)
            // console.log(data)
            res.render('Admin/about/edit',{edit:data})
        }catch(error){
            console.log(error)
        }
    }

    static updateaboutus = async (req,res)=>{
        try{

            if(!req.files){
                const result = await aboutusmodel.findByIdAndUpdate(req.params.id,{
                    title:req.body.content,
                })
                await result.save()
            }
            else{  
                //delete image
                const data = await aboutusmodel.findById(req.params.id)
                const imageid = data.image.public_id
                await cloudinary.uploader.destroy(imageid)

                //update image
                const file = req.files.image
                const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                    folder:'AboutUsImage'
                })


                const result = await aboutusmodel.findByIdAndUpdate(req.params.id,{
                    title:req.body.content,
                    image:{
                        public_id:myimage.public_id,
                        url:myimage.secure_url
                    }
                })
                await result.save()
            }

            res.redirect("/admin/about/display")
        }
        catch(error){
           console.log(error)
        }
    }
}




module.exports = AboutController