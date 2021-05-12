const mongoose = require("mongoose");


const seriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the name of the series"]
    },
    image: {
        type: String,
        required: [true, "Please provide the image"]
    },
    messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
});


const Series = mongoose.model("Series", seriesSchema);

module.exports = Series;