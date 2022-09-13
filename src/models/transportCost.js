const mongoose = require('mongoose');
let scheme = mongoose.Schema({
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
    required: [true,'Wilayah harus diisi !']
  },
  nominal: {
    type: Number,
    required: [true,'Nominal harus diisi !']
  },
},{timestamps: true});
module.exports = mongoose.model('TransportCost',scheme);