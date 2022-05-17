const cloudinary = require('cloudinary')
const fs = require('fs')

const ProfileModel = require('../models/profiles.models')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})




const uploadAvatar = (req, res, next) => {
    try {
        const file = req.files.file;

        cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: 'avatar', width: 150, height: 150, crop: "fill"
        }, async (err, result) => {
            if (err) return res.status(400).json(err)
             var url=result.secure_url
            removeTmp(file.tempFilePath)
            //  req.body.avatar=result.secure_url;
            res.json({ url: result.secure_url })
            ProfileModel.findOne({ user: req.user.id })
                .then(async (profile) => {
                    req.body.avatar = result.secure_url
                    if (!profile) {


                        req.body.avatar = result.secure_url
                        req.body.user = req.user.id

                        await ProfileModel.create(req.body,function(err){
                            if(err){
                                console.log(err)
                            }
                            else{
                                console.log("succ")
                            }

                        })
                      
                    }
                    else {

                        await ProfileModel.findOneAndUpdate(
                            {_id: profile._id},
                            req.body,
                            {new: true}
                        ).then(()=>{
                            console.log("bien")
                        })
                       // await ProfileModel.updateMany({
                       //     user: req.user.id,
                       //     avatar: url,
                       //     tel: req.body.tel,
                       //     cin: req.body.cin,
                       //     adress_actuel: req.body.adress_actuel,
                       //     matricule_voiture: req.body.matricule_voiture,
                       //     type_voiture: req.body.type_voiture,
                   //     poids: req.body.poids
//
                       // }).then(()=>{
                       //     console.log("bien")
                       // })
                      

                    }
                })
        }

        )


    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}




const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err
    })
}

module.exports = {
    uploadAvatar
}