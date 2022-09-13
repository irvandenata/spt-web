const mongoose = require('mongoose');
let scheme = mongoose.Schema({
  province: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Province',
    required: [true,'Provinsi harus diisi !']
  },
  nominal: {
    type: Number,
    required: [true,'Nominal harus diisi !']
  },
},{timestamps: true});
module.exports = mongoose.model('DailyCost',scheme);