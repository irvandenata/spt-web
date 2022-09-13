const mongoose = require('mongoose');
let scheme = mongoose.Schema({
  name: {
    type: String,
    required: [true,'Nama Jabatan harus diisi !']
  },
},{timestamps: true});
module.exports = mongoose.model('Position',scheme);