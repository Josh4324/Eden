const mongoose = require("mongoose");


const verseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide the title of the verse"]
    },
    body: {
        type: String,
        required: [true, "Please provide the body of the verse"]
    },
    date: {
        type: Date,
        default: Date.now()
    }
});


const Verse = mongoose.model("Verse", verseSchema);

module.exports = Verse;