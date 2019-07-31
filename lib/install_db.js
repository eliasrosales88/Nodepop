'use strict'
var Advert = require('../models/Advert');
var conn = require('./connectMongoose');

var arr = [
    { 
        title: 'Car',
        description: 'White Ford fiesta',
        price: 2000,
        isSelled: true,
        picture: 'ford-white.jpg',
        tags: ['motor'] 

    },
    { 
        title: 'MyPhone',
        description: 'Just my phone',
        price: 800,
        isSelled: true,
        picture: 'phone.jpg',
        tags: ['mobile'] 

    },
    { 
        title: 'Vacations',
        description: 'Cancun resort',
        price: 1000,
        isSelled: false,
        picture: 'cancun.jpg',
        tags: ['lifestyle'] 

    },
    { 
        title: 'Job',
        description: 'Looking for a job',
        price: 3500,
        isSelled: false,
        picture: 'job.jpg',
        tags: ['work'] 

    },
    { 
        title: 'Race',
        description: 'Looking for race',
        price: 5000,
        isSelled: false,
        picture: 'race.jpg',
        tags: ['lifestyle', 'mobile', 'work'] 

    }
];


var clearDB = async () => {
    await Advert.deleteMany({});
};


clearDB().then( () => {
    Advert.insertMany(arr, function(error, docs) {});
});

module.exports = conn;