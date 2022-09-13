const mongoose = require('mongoose');
let paymentScheme = mongoose.Schema({
  type: {
    type: String,
    require: [true,'Tipe Pembayaran harus diisi !']
  },
  status: {
    type: String,
    enum: ['Y','N'],
    default: 'Y',
  },
  banks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bank',
    require: [true,'Bank harus diisi !']
  }],
},{timestamps: true});
module.exports = mongoose.model('Payment',paymentScheme);