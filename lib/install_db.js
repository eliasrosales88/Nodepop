'use strict'
var Advert = require('../models/Advert');
var conn = require('./connectMongoose');

var arr = [
    { 
        title: 'Car 1',
        description: 'White Ford fiesta',
        price: 2000,
        isSold: true,
        picture: 'ford-white.jpg',
        tags: ['motor'] 

    },
    { 
        title: 'MyPhone',
        description: 'Just my phone',
        price: 800,
        isSold: true,
        picture: 'phone.jpg',
        tags: ['mobile'] 

    },
    { 
        title: 'Vacations',
        description: 'Cancun resort',
        price: 1000,
        isSold: false,
        picture: 'cancun.jpg',
        tags: ['lifestyle'] 

    },
    { 
        title: 'Job',
        description: 'Looking for a job',
        price: 3500,
        isSold: false,
        picture: 'job.jpg',
        tags: ['work'] 

    },
    { 
        title: 'Race',
        description: 'Looking for race',
        price: 5000,
        isSold: false,
        picture: 'race.jpg',
        tags: ['lifestyle', 'mobile', 'work'] 

    },
    { 
        title: 'Car 2',
        description: 'White Ford fiesta',
        price: 20000,
        isSold: true,
        picture: 'ford-white.jpg',
        tags: ['motor'] 

    },
    { 
        title: 'MyPhone',
        description: 'Just my phone',
        price: 8000,
        isSold: true,
        picture: 'phone.jpg',
        tags: ['mobile'] 

    },
    { 
        title: 'Vacations',
        description: 'Cancun resort',
        price: 1000,
        isSold: false,
        picture: 'cancun.jpg',
        tags: ['lifestyle'] 

    },
    { 
        title: 'Job',
        description: 'Looking for a job',
        price: 350,
        isSold: false,
        picture: 'job.jpg',
        tags: ['work'] 

    },
    { 
        title: 'Race',
        description: 'Looking for race',
        price: 5000,
        isSold: false,
        picture: 'race.jpg',
        tags: ['lifestyle', 'mobile', 'work'] 

    },
    { 
        title: 'Car 3',
        description: 'White Ford fiesta',
        price: 2000,
        isSold: true,
        picture: 'ford-white.jpg',
        tags: ['motor'] 

    },
    { 
        title: 'MyPhone',
        description: 'Just my phone',
        price: 800,
        isSold: true,
        picture: 'phone.jpg',
        tags: ['mobile'] 

    },
    { 
        title: 'Vacations',
        description: 'Cancun resort',
        price: 1000,
        isSold: false,
        picture: 'cancun.jpg',
        tags: ['lifestyle'] 

    },
    { 
        title: 'Job',
        description: 'Looking for a job',
        price: 3500,
        isSold: false,
        picture: 'job.jpg',
        tags: ['work'] 

    },
    { 
        title: 'Race',
        description: 'Looking for race',
        price: 500,
        isSold: false,
        picture: 'race.jpg',
        tags: ['lifestyle', 'mobile', 'work'] 

    },
    { 
        title: 'Car 4',
        description: 'White Ford fiesta',
        price: 2000,
        isSold: true,
        picture: 'ford-white.jpg',
        tags: ['motor'] 

    },
    { 
        title: 'MyPhone',
        description: 'Just my phone',
        price: 800,
        isSold: true,
        picture: 'phone.jpg',
        tags: ['mobile'] 

    },
    { 
        title: 'Vacations',
        description: 'Cancun resort',
        price: 1000,
        isSold: false,
        picture: 'cancun.jpg',
        tags: ['lifestyle'] 

    },
    { 
        title: 'Job',
        description: 'Looking for a job',
        price: 3500,
        isSold: false,
        picture: 'job.jpg',
        tags: ['work'] 

    },
    { 
        title: 'Race',
        description: 'Looking for race',
        price: 5000,
        isSold: false,
        picture: 'race.jpg',
        tags: ['lifestyle', 'mobile', 'work'] 

    },
    { 
        title: 'Car 5',
        description: 'White Ford fiesta',
        price: 2000,
        isSold: true,
        picture: 'ford-white.jpg',
        tags: ['motor'] 

    },
    { 
        title: 'MyPhone',
        description: 'Just my phone',
        price: 800,
        isSold: true,
        picture: 'phone.jpg',
        tags: ['mobile'] 

    },
    { 
        title: 'Vacations',
        description: 'Cancun resort',
        price: 1000,
        isSold: false,
        picture: 'cancun.jpg',
        tags: ['lifestyle'] 

    },
    { 
        title: 'Job',
        description: 'Looking for a job',
        price: 3500,
        isSold: false,
        picture: 'job.jpg',
        tags: ['work'] 

    },
    { 
        title: 'Race',
        description: 'Looking for race',
        price: 1000,
        isSold: false,
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