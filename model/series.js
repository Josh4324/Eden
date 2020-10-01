const mongoose = require("mongoose");


const seriesSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
});


const Series = mongoose.model("Series", seriesSchema);

module.exports = Series;