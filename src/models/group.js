const mongoose = require('mongoose');
let scheme = mongoose.Schema({
  name: {
    type: String,
    required: [true,'Nama Golongan harus diisi !']
  },
},{timestamps: true});
module.exports = mongoose.model('Group',scheme);