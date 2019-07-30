'use strict'
// Load Mongoose
const mongoose = require('mongoose');
const conn = mongoose.connection;

mongoose.set('useFindAndModify', false);

// On error
conn.on('error', err =>{
    console.log('Connection error', err);
    process.exit(1);
});


conn.once('open', ()=>{
    console.log('Connected to MongoDB in', conn.name);
})

// connect
mongoose.connect('mongodb://localhost/nodepop', { useNewUrlParser: true });

// export connection
module.exports = conn;