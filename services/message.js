const Message = require('../model/message');

module.exports = class MessageService {
    async findAllMessages(max,page){
        return await Message.find({}).limit(max).skip(page).sort({date: -1});
    }

    async findMessageWithId(id){
        return await Message.findOne({_id: id});
    }

    async createMessage(message){
        return await Message.create(message);
    }  

    async updateMessage(id, payload){
        return await Message.findByIdAndUpdate({_id:id}, payload, {
            new: true,
        });
    }
    
}