const mongoose = require("mongoose");


const homeGroupSchema = new mongoose.Schema({
    placeName: {
        type: String,
    },
    leaderName: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
});


const HomeGroup = mongoose.model("HomeGroup", homeGroupSchema);

module.exports = HomeGroup;