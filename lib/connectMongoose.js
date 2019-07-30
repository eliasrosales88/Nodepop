'use strict'
// cargar libreria de Mongoose
const mongoose = require('mongoose');
const conn = mongoose.connection;

mongoose.set('useFindAndModify', false);

// gestionar eventos de conexion
conn.on('error', err =>{
    console.log('Connection error', err);
    process.exit(1);
});


conn.once('open', ()=>{
    console.log('Connected to MongoDB in', conn.name);
})

// conectar
mongoose.connect('mongodb://localhost/nodepop', { useNewUrlParser: true });

// exportar la conexion (opcional)
module.exports = conn;