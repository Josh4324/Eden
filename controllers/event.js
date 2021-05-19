const EventService = require("../services/event");
const {Response} = require('../helpers');

const eventService = new EventService();


exports.createEvent = async (req, res) => {
    try {
        
        const event = await eventService.createEvent(req.body);

        const response = new Response(
            true,
            201,
            "Event created successfully",
            event
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

exports.updateEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const event = await eventService.updateEvent(id, req.body)

        const response = new Response(
            true,
            200,
            "Event updated successfully",
            event
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

exports.getAllEvent = async (req, res) => {
    try {
        let limit = Number(req.query.limit);
        let skip = Number(req.query.skip);

        if (!limit){
            limit = 10;
        }

        if (!skip){
            skip = 0;
        }

        const event = await eventService.findAllEvent(limit, skip);

       const response = new Response(
            true,
            200,
            "Success",
            event
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

exports.getOneEvent = async (req, res) => {
    try {
        let id = req.params.id;
       
        const event = await eventService.findEventWithId(id);

       const response = new Response(
            true,
            200,
            "Success",
            event
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