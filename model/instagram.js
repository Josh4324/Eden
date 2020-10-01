const mongoose = require("mongoose");


const instagramSchema = new mongoose.Schema({
   
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    instagramLink: {
        type: String,
    },
    date: {
        type: Date,
    },
});


const Instagram = mongoose.model("Instagram", instagramSchema);

module.exports = Instagram;