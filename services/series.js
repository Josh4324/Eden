const Series = require('../model/series');

module.exports = class SeriesService {
    async findAllSeries(){
        return await Series.find({}).populate('messages');
    }

    async findSeriesWithId(id){
        return await Series.findOne({_id: id}).populate('messages');
    }

    async findSeriesWithName(name){
        return await Series.findOne({name});
    }

    async createSeries(series){
        return await Series.create(series);
    }  

    async updateSeries(id, payload){
        return await Series.findByIdAndUpdate({_id:id}, payload, {
            new: true,
        });
    }

    async updateSeriesAndPush(payload, update){
        return await Series.findOneAndUpdate(payload, update, {
            new: true,
        });
    }
    
}