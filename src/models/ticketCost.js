const mongoose = require('mongoose');
let scheme = mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
    required: [true,'Wilayah berangkat harus diisi !']
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
    required: [true,'Wilayah tujuan diisi !']
  },
  nominal: {
    type: Number,
    required: [true,'Nominal harus diisi !']
  },
},{timestamps: true});
module.exports = mongoose.model('TicketCost',scheme);