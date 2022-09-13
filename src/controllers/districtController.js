const {District} = require('../models');
const {Province} = require('../models');
module.exports = {
  index: async (req,res,next) =>
  {
    try
    {
      const districts = await District.find().populate('province').sort({updatedAt: -1});
      const alertMessage = req.flash('alertMessage');
      console.log(districts);
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        current: 'districts',
        title: 'Kabupaten / Kota',
        view: '../district/index.ejs',
        js: '../district/js.ejs',
        css: '../district/css.ejs',
        districts: districts,
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
      const provinces = await Province.find().sort({name: 1});
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        title: 'Tambah Kabupaten / Kota',
        current: 'districs',
        type: 'Tambah',
        js: '../district/js.ejs',
        css: '../district/css.ejs',
        view: '../district/createOrUpdate.ejs',
        action: '/districts/create',
        alert: alert,
        provinces: provinces
      });
    } catch(error)    
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/district');
    }
  },

  store: async (req,res,next) =>
  {
    try
    {
      const {name,province_id} = req.body;

      const district = await District({name: name,province: province_id});
      await district.save();
      req.flash('alertMessage','Data berhasil ditambahkan');
      req.flash('alertStatus','success');
      return res.redirect('/districts');
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
    const provinces = await Province.find().sort({name: 1});
    const district = await District.findOne({_id: id}).populate('province');
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = {
      message: alertMessage,
      status: alertStatus
    }
    if(!district)
    {
      req.flash('alertMessage','Data tidak ditemukan');
      req.flash('alertStatus','danger');
      res.redirect('/districts');
    }
    res.render('layouts/index',{
      title: 'Ubah Data Kabupaten / Kota',
      current: 'districts',
      type: 'Tambah',
      view: '../district/createOrUpdate.ejs',
      district: district,
      action: '/districts/' + id + '/edit?_method=PUT',
      js: '../district/js.ejs',
      css: '../district/css.ejs',
      alert: alert,
      provinces: provinces
    });
  },
  update: async (req,res) =>
  {
    try
    {
      const {name,province_id} = req.body;
      const {id} = req.params
      const district = await District.findOne({_id: id});
      if(!district)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/districts');
      }
      const districtUpdate = await District.findOneAndUpdate({_id: id},{name: name,province: province_id});
      req.flash('alertMessage','Data berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/districts');
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

      const district = await District.findOne({_id: id});
      if(!district)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/districts');
      }
      await District.findOneAndRemove({_id: id});
      req.flash('alertMessage','Data berhasil dihapus');
      req.flash('alertStatus','success');
      res.redirect('/districts');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/districts');
    }

  },
}