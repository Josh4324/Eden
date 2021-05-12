const SeriesService = require("../services/series");
const cloudinary = require("cloudinary").v2;
const {Response} = require('../helpers');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

const seriesService = new SeriesService();


exports.createSeries = async (req, res) => {
    try {
        
        cloudinary.uploader.upload(req.file.path, async (error, result) => {
            if (result) {
                let image = result.secure_url;
                req.body.image = image;

                const series = await seriesService.createSeries(req.body);

                const response = new Response(
                    true,
                    201,
                    "Series created successfully",
                    series
                  );
                  res.status(response.code).json(response);
            }
        });
        
    } catch (err) {
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

exports.updateSeries = async (req, res) => {
    try {
        const id = req.params.id;
        const series = await seriesService.updateSeries(id, req.body)

        const response = new Response(
            true,
            200,
            "Series updated successfully",
            series
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

exports.getAllSeries = async (req, res) => {
    try {
        let limit = req.query.limit;
        let skip = req.query.skip

        if (!limit){
            limit = 10;
        }

        if (!skip){
            skip = 0;
        }

        const series = await seriesService.findAllSeries(limit, skip);

       const response = new Response(
            true,
            200,
            "Success",
            series
          );
        res.status(response.code).json(response);
        
    }catch(err){
        console.log(err)
        const response = new Response(
            false,
            500,
            "Server Error",
            err
          );
        res.status(response.code).json(response);
    }
}

exports.getOneSeries = async (req, res) => {
    try {
        let id = req.params.id;
       
        const series = await seriesService.findSeriesWithId(id);

       const response = new Response(
            true,
            200,
            "Success",
            series
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