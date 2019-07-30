'use strict';

const mongoose = require('mongoose');

// Schema definition
const advertSchema = mongoose.Schema({
    title: String,
    price: Number,
    isSelled: Boolean,
    isSearched: Boolean,
    picture: String,
    tags: Array
});


advertSchema.statics.list = function({filter, skip, limit, fields, sort}){
    const query = Advert.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields)
    query.sort(sort);
    return query.exec();
}


// Creating Advert model
const Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert;