const {Province} = require('../models');
module.exports = {
  index: async (req,res,next) =>
  {
    try
    {
      const provinces = await Province.find().sort({updatedAt: -1});
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        current: 'provinces',
        title: 'Provinsi',
        view: '../province/index.ejs',
        js: '../province/js.ejs',
        css: '../province/css.ejs',
        provinces: provinces,
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
        title: 'Tambah Provinsi',
        current: 'provinces',
        type: 'Tambah',
        js: '../province/js.ejs',
        css: '../province/css.ejs',
        view: '../province/createOrUpdate.ejs',
        action: '/provinces/create',
        alert: alert
      });
    } catch(error)    
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/provinces');
    }
  },

  store: async (req,res,next) =>
  {
    try
    {
      const {name} = req.body;
      const province = await Province({name: name});
      await province.save();
      req.flash('alertMessage','Data berhasil ditambahkan');
      req.flash('alertStatus','success');
      return res.redirect('/provinces');
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
    const province = await province.findOne({_id: id});
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = {
      message: alertMessage,
      status: alertStatus
    }
    if(!province)
    {
      req.flash('alertMessage','Data tidak ditemukan');
      req.flash('alertStatus','danger');
      res.redirect('/provinces');
    }
    res.render('layouts/index',{
      title: 'Ubah Data Provinsi',
      current: 'provinces',
      type: 'Tambah',
      view: '../province/createOrUpdate.ejs',
      province: province,
      action: '/provinces/' + id + '/edit?_method=PUT',
      js: '../province/js.ejs',
      css: '../province/css.ejs',
      alert: alert
    });
  },
  update: async (req,res) =>
  {
    try
    {
      const {name} = req.body;
      const {id} = req.params
      const province = await province.findOne({_id: id});
      if(!province)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/provinces');
      }
      const provinceUpdate = await province.findOneAndUpdate({_id: id},{name: name});
      req.flash('alertMessage','Data berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/provinces');
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

      const province = await province.findOne({_id: id});
      if(!province)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/provinces');
      }
      await province.findOneAndRemove({_id: id});
      req.flash('alertMessage','Data berhasil dihapus');
      req.flash('alertStatus','success');
      res.redirect('/provinces');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/provinces');
    }

  },
}