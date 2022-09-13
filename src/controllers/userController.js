const {District} = require('../models');
const fs = require('fs-extra');
const path = require('path');
const config = require('../configs');
const {User} = require('../models');
module.exports = {
  index: async (req,res,next) =>
  {
    try
    {
      console.log('jalan')
      const users = await User.find().sort({updatedAt: -1});
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        current: 'users',
        title: 'Akun Pengguna',
        view: '../user/index.ejs',
        js: '../user/js.ejs',
        css: '../user/css.ejs',
        users: users,
        alert: alert
      });
    } catch(error)
    {
      console.log(error);
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/users');
    }
  },
  create: async (req,res,next) =>
  {
    try
    {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        title: 'Tambah Akun Pengguna',
        current: 'users',
        type: 'Tambah',
        js: '../user/js.ejs',
        css: '../user/css.ejs',
        view: '../user/createOrUpdate.ejs',
        action: '/users/create',
        alert: alert
      });
    } catch(error)    
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/users');
    }
  },
  store: async (req,res,next) =>
  {
    try
    {
      const {name,email,password} = req.body;
      console.log(req.body);
      const usercheck = await User.findOne({email: email});
      if(usercheck)
      {
        req.flash('alertMessage','Email sudah terdaftar');
        req.flash('alertStatus','danger');
        return res.redirect('back');
      }
      const user = await User({name: name,password: password,email: email});
      await user.save();
      console.log(user);
      req.flash('alertMessage','Akun Pengguna berhasil ditambahkan');
      req.flash('alertStatus','success');
      return res.redirect('/users');
    } catch(error)
    {
      console.log(error);
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('back');
    }
  },
  show: async (req,res) =>
  {
    const {id} = req.params
    const user = await User.findOne({_id: id});
    if(!user)
    {
      req.flash('alertMessage','Akun Pengguna tidak ditemukan');
      req.flash('alertStatus','danger');
      res.redirect('/users');
    }
    res.render('layouts/index',{
      title: 'Ubah Akun Pengguna',
      current: 'users',
      type: 'Tambah',
      view: '../user/createOrUpdate.ejs',
      user: user,
      action: '/users/' + id + '/edit?_method=PUT',
      js: '../user/js.ejs',
      css: '../user/css.ejs'
    });
  },
  update: async (req,res) =>
  {
    try
    {
      const {name,email,password} = req.body;
      const {id} = req.params
      const user = await User.findOne({_id: id});
      if(!user)
      {
        req.flash('alertMessage','Akun Pengguna tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/users');
      }
      const userUpdate = await User.findOneAndUpdate({_id: id},{name: name,email: email,password: password});
      const usernew = await User.findOne({_id: id});
      console.log(usernew);
      req.flash('alertMessage','Akun Pengguna berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/users');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('back');
    }

  },
  destroy: async (req,res) =>
  {
    try
    {
      const {id} = req.params;

      const user = await User.findOne({_id: id});
      if(!user)
      {
        req.flash('alertMessage','Akun Pengguna tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/users');
      }
      await User.findOneAndRemove({_id: id});
      req.flash('alertMessage','Akun Pengguna berhasil dihapus');
      req.flash('alertStatus','success');
      res.redirect('/users');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/users');
    }

  },

}