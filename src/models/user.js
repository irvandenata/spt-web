const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
let scheme = mongoose.Schema({
  name: {
    type: String,
    required: [true,'Nama Daerah harus diisi !']
  },
  email: {
    type: String,
    required: [true,'Email harus diisi !']
  },
  password: {
    type: String,
    required: [true,'Password harus diisi !']
  },
  role: {
    type: String,
    enum: ['admin','user'],
    default: 'user'
  },
  pegawai: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pegawai'
  },
},{timestamps: true});


scheme.pre('save',function (next)
{
  this.password = bcrypt.hashSync(this.password,10);
  next();
});
scheme.pre('findOneAndUpdate',function (next)
{
  let password = this._update.password;
  this.getUpdate().password = bcrypt.hashSync(password,10);
  next();
});

scheme.methods.comparePassword = function (password)
{
  return bcrypt.compareSync(password,this.password);
}
module.exports = mongoose.model('Users',scheme);