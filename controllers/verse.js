const VerseService = require("../services/verse");
const {Response} = require('../helpers');

const verseService = new VerseService();


exports.createVerse = async (req, res) => {
    try {
        
        const verse = await verseService.createVerse(req.body);

        const response = new Response(
            true,
            201,
            "Verse created successfully",
            verse
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

exports.updateVerse = async (req, res) => {
    try {
        const id = req.params.id;
        const verse = await verseService.updateVerse(id, req.body)

        const response = new Response(
            true,
            200,
            "Event updated successfully",
            verse
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

exports.getAllVerse = async (req, res) => {
    try {
        let limit = Number(req.query.limit);
        let skip = Number(req.query.skip);
        let title = String(req.query.title);

        if (!limit){
            limit = 10;
        }

        if (!skip){
            skip = 0;
        }

        
        let verse;
        if (title !== "undefined"){
            verse = await verseService.findVerseWithTitle(title,limit,skip);
        }else {
            verse = await verseService.findAllVerse(limit,skip);
        }

       const response = new Response(
            true,
            200,
            "Success",
            verse
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

exports.getVerseWithId = async (req, res) => {
    try {
        let id = req.params.id;
       
        const verse = await verseService.findVerseWithId(id);

       const response = new Response(
            true,
            200,
            "Success",
            verse
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
