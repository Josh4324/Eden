const mongoose = require("mongoose");


const verseSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    date: {
        type: Date,
    },
    verseList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Verse"
    }]
});


const Verse = mongoose.model("Verse", verseSchema);

module.exports = Verse;