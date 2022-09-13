const env = require('dotenv').config();
const path = require('path');
module.exports = {
  rootPath: path.resolve(__dirname,'..'),
  urlDB: process.env.MONGO_URL_PROD,
  jwtKey: process.env.JWT_SECRET,
}