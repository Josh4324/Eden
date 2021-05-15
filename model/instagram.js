const mongoose = require("mongoose");


const instagramSchema = new mongoose.Schema({
   
    image: {
        type: String,
        required: [true, "Please provide the image"]
    },
    description: {
        type: String,
        required: [true, "Please provide the description"]
    },
    instagramLink: {
        type: String,
        required: [true, "Please provide the instagram link"]
    },
    date: {
        type: Date,
        required: [true, "Please provide the date"]
    },
});


const Instagram = mongoose.model("Instagram", instagramSchema);

module.exports = Instagram;