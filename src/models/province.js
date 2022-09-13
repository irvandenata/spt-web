const mongoose = require('mongoose');
let scheme = mongoose.Schema({
  name: {
    type: String,
    required: [true,'Nama Provinsi harus diisi !']
  },
},{timestamps: true});
module.exports = mongoose.model('Province',scheme);