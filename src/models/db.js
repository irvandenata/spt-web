const mongose = require('mongoose');
const {urlDB} = require('../configs');

mongose.connect(urlDB,{useNewUrlParser: true,useUnifiedTopology: true});

const db = mongose.connection;

module.exports = db;