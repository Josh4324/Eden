const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    topic: {
        type: String,
    },
    date: {
        type: Date
    },
    preachers: [{
        type: String,
    }],
    image: {
        type: String,
    },
    audio: {
        type: String,
    },
    youtube: {
        type: String,
    },
    summary: {
        type: String,
    },
    messageList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }
]
});


const Message = mongoose.model("Message", messageSchema);

module.exports = Message;