const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the name of the event"]
    },
    dateTime: {
        type: Date,
        required: [true, "Please provide the date of the event"]
    },
    date: {
        type: Date,
        default: Date.now()
    }
});


const Event = mongoose.model("Event", eventSchema);

module.exports = Event;