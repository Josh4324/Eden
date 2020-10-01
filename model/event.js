const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    dateTime: {
        type: Date,
    },
});


const Event = mongoose.model("Event", eventSchema);

module.exports = Event;