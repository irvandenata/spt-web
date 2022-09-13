const {Position} = require('../models');
module.exports = {
  index: async (req,res,next) =>
  {
    try
    {
      const positions = await Position.find().sort({updatedAt: -1});
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        current: 'positions',
        title: 'Pangkat',
        view: '../position/index.ejs',
        js: '../position/js.ejs',
        css: '../position/css.ejs',
        positions: positions,
        alert: alert
      });
    } catch(error)
    {
      console.log(error);
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/');
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
        title: 'Tambah Pangkat',
        current: 'positions',
        type: 'Tambah',
        js: '../position/js.ejs',
        css: '../position/css.ejs',
        view: '../position/createOrUpdate.ejs',
        action: '/positions/create',
        alert: alert
      });
    } catch(error)    
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/positions');
    }
  },

  store: async (req,res,next) =>
  {
    try
    {
      const {name} = req.body;
      const position = await Position({name: name});
      await position.save();
      req.flash('alertMessage','Data berhasil ditambahkan');
      req.flash('alertStatus','success');
      return res.redirect('/positions');
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
    const position = await Position.findOne({_id: id});
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = {
      message: alertMessage,
      status: alertStatus
    }
    if(!position)
    {
      req.flash('alertMessage','Data tidak ditemukan');
      req.flash('alertStatus','danger');
      res.redirect('/positions');
    }
    res.render('layouts/index',{
      title: 'Ubah Data Provinsi',
      current: 'positions',
      type: 'Tambah',
      view: '../position/createOrUpdate.ejs',
      position: position,
      action: '/positions/' + id + '/edit?_method=PUT',
      js: '../position/js.ejs',
      css: '../position/css.ejs',
      alert: alert
    });
  },
  update: async (req,res) =>
  {
    try
    {
      const {name} = req.body;
      const {id} = req.params
      const position = await Position.findOne({_id: id});
      if(!position)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/positions');
      }
      const positionUpdate = await Position.findOneAndUpdate({_id: id},{name: name});
      req.flash('alertMessage','Data berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/positions');
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

      const position = await Position.findOne({_id: id});
      if(!position)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/positions');
      }
      await Position.findOneAndRemove({_id: id});
      req.flash('alertMessage','Data berhasil dihapus');
      req.flash('alertStatus','success');
      res.redirect('/positions');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/positions');
    }

  },
}