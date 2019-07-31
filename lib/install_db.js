'use strict'
var Advert = require('../models/Advert');
var conn = require('./connectMongoose');

var arr = [
    { 
        title: 'Car',
        description: 'White Ford fiesta',
        price: 2000,
        isSelled: true,
        picture: 'fiesta.png',
        tags: ['motor'] 

    },
    { 
        title: 'MyPhone',
        description: 'Just my phone',
        price: 800,
        isSelled: true,
        picture: 'myphone.png',
        tags: ['mobile'] 

    },
    { 
        title: 'Vacations',
        description: 'Cancun resort',
        price: 1000,
        isSelled: false,
        picture: 'cancun.png',
        tags: ['lifestyle'] 

    },
    { 
        title: 'Job',
        description: 'Looking for a job',
        price: 3500,
        isSelled: false,
        picture: 'job.png',
        tags: ['work'] 

    },
];


var clearDB = async () => {
    await Advert.deleteMany({});
};


clearDB().then( () => {
    Advert.insertMany(arr, function(error, docs) {});
});

module.exports = conn;