const HomeGroupService = require("../services/homegroup");
const {Response} = require('../helpers');

const homeGroupService = new HomeGroupService();


exports.createHomeGroup = async (req, res) => {
    try {
        
        const homegroup = await homeGroupService.createHomeGroup(req.body);

        const response = new Response(
            true,
            201,
            "Homegroup created successfully",
            homegroup
            );
            res.status(response.code).json(response);
        
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

exports.updateHomeGroup = async (req, res) => {
    try {
        const id = req.params.id;
        const homegroup = await homeGroupService.updateHomeGroup(id, req.body)

        const response = new Response(
            true,
            200,
            "Homegroup updated successfully",
            homegroup
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

exports.getAllHomeGroup = async (req, res) => {
    try {
        let limit = Number(req.query.limit);
        let skip = Number(req.query.skip);

        if (!limit){
            limit = 10;
        }

        if (!skip){
            skip = 0;
        }

        const homegroup = await homeGroupService.findAllHomeGroup(limit, skip);

       const response = new Response(
            true,
            200,
            "Success",
            homegroup
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

exports.getOneHomeGroup = async (req, res) => {
    try {
        let id = req.params.id;
       
        const homegroup = await homeGroupService.findHomeGroupWithId(id);

       const response = new Response(
            true,
            200,
            "Success",
            homegroup
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