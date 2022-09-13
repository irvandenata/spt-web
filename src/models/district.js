const mongoose = require('mongoose');
let scheme = mongoose.Schema({
  name: {
    type: String,
    required: [true,'Nama Daerah harus diisi !']
  },
  province: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Province',
    required: [true,'Provinsi harus diisi !']
  }
},{timestamps: true});
module.exports = mongoose.model('District',scheme);