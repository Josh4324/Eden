const Instagram = require('../model/instagram');

module.exports = class InstagramService {
    async findAllInstagram(max, page){
        return await Instagram.find({}).limit(max).skip(page).sort({date: -1});
    }

    async findInstagramWithId(id){
        return await Instagram.findOne({_id: id});
    }

    async findInstagramWithName(name){
        return await Instagram.findOne({name});
    }

    async createInstagram(instagram){
        return await Instagram.create(instagram);
    }  

    async updateInstagram(id, payload){
        return await Instagram.findByIdAndUpdate({_id:id}, payload, {
            new: true,
        });
    }
    
}