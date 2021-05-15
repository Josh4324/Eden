const InstagramService = require("../services/instagram");
const {Response} = require('../helpers');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

const instagramService = new InstagramService();


exports.createInstagram = async (req, res) => {
    try {

        cloudinary.uploader.upload(req.file.path, async (error, result) => {
            if (result) {
                let image = result.secure_url;
                req.body.image = image;
               
                const instagram = await instagramService.createInstagram(req.body);

                const response = new Response(
                    true,
                    201,
                    "Instagram Post created successfully",
                    instagram
                    );
                    res.status(response.code).json(response);
                    }
        });
        
        
        
    } catch (err) {
        const response = new Response(
            false,
            500,
            "Server Error",
            err
          );
          res.status(response.code).json(response);
    }
}

exports.updateInstagram = async (req, res) => {
    try {
        const id = req.params.id;
        const instagram = await instagramService.updateInstagram(id, req.body)

        const response = new Response(
            true,
            200,
            "Instagram post updated successfully",
            instagram
          );
        res.status(response.code).json(response);

    }catch (err){
        console.log(err);
        const response = new Response(
            false,
            500,
            "Server Error",
            err
          );
        res.status(response.code).json(response);
    }
}

exports.getAllInstagram = async (req, res) => {
    try {
        let limit = req.query.limit;
        let skip = req.query.skip

        if (!limit){
            limit = 10;
        }

        if (!skip){
            skip = 0;
        }

        const instagram = await instagramService.findAllInstagram(limit, skip);

       const response = new Response(
            true,
            200,
            "Success",
            instagram
          );
        res.status(response.code).json(response);
        
    }catch(err){
       
        const response = new Response(
            false,
            500,
            "Server Error",
            err
          );
        res.status(response.code).json(response);
    }
}

exports.getOneInstagram = async (req, res) => {
    try {
        let id = req.params.id;
       
        const instagram = await instagramService.findInstagramWithId(id);

       const response = new Response(
            true,
            200,
            "Success",
            instagram
          );
        res.status(response.code).json(response);
        
    }catch(err){
        const response = new Response(
            false,
            500,
            "Server Error",
            err
          );
        res.status(response.code).json(response);
    }
}