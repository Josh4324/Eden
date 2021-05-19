const mongoose = require("mongoose");


const dailyEdgeSchema = new mongoose.Schema({
   
    image: {
        type: String,
        required: [true, "Please provide the image"]
    },
    title: {
        type: String,
        required: [true, "Please provide the title"]
    },
    author: {
        type: String,
        required: [true, "Please provide the author"]
    },
    body: {
        type: String,
        required: [true, "Please provide the body"]
    },
    about: {
        type: String,
        required: [true, "Please provide the about"]
    },
    date: {
        type: Date,
        default: Date.now()
    }
});


const DailyEdge = mongoose.model("DailyEdge", dailyEdgeSchema);

module.exports = DailyEdge;