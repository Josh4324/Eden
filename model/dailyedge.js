const mongoose = require("mongoose");


const dailyEdgeSchema = new mongoose.Schema({
   
    image: {
        type: String,
    },
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    body: {
        type: String,
    },
    date: {
        type: Date,
    },
    about: {
        type: String,
    },
    dailyEdgeList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DailyEdge"
    }]
});


const DailyEdge = mongoose.model("DailyEdge", dailyEdgeSchema);

module.exports = DailyEdge;