const {AccommodationCost,Province} = require('../../models');
module.exports = {
  index: async (req,res,next) =>
  {
    try
    {
      const accommodations = await AccommodationCost.find().sort({updatedAt: -1}).populate('province');
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        current: 'costs/accommodations',
        title: 'Anggaran Uang Penginapan',
        view: '../cost/accommodation/index.ejs',
        js: '../cost/accommodation/js.ejs',
        css: '../cost/accommodation/css.ejs',
        accommodations: accommodations,
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
        title: 'Data Anggaran Uang Penginapan',
        current: 'accommodations',
        type: 'Tambah',
        js: '../cost/accommodation/js.ejs',
        css: '../cost/accommodation/css.ejs',
        view: '../cost/accommodation/createOrUpdate.ejs',
        action: '/costs/accommodations/create',
        alert: alert,
        provinces: provinces
      });
    } catch(error)    
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/accommodations');
    }
  },

  store: async (req,res,next) =>
  {
    try
    {
      const {province,nominal} = req.body;
      console.log(req.body);
      const nominalInt = parseInt((nominal.split('.')[0]).replaceAll(',',''));
      const accommodation = await AccommodationCost({province: province,nominal: nominalInt});
      await accommodation.save();
      req.flash('alertMessage','Data berhasil ditambahkan');
      req.flash('alertStatus','success');
      return res.redirect('/costs/accommodations');
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
    const accommodation = await AccommodationCost.findOne({_id: id}).populate('province');
    const provinces = await Province.find();
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = {
      message: alertMessage,
      status: alertStatus
    }
    if(!accommodation)
    {
      req.flash('alertMessage','Data tidak ditemukan');
      req.flash('alertStatus','danger');
      res.redirect('/accommodations');
    }
    res.render('layouts/index',{
      title: 'Data Anggaran Uang Harian',
      current: 'accommodations',
      type: 'Tambah',
      view: '../cost/accommodation/createOrUpdate.ejs',
      accommodation: accommodation,
      action: '/costs/accommodations/' + id + '/edit?_method=PUT',
      js: '../cost/accommodation/js.ejs',
      css: '../cost/accommodation/css.ejs',
      alert: alert,
      provinces: provinces
    });
  },
  update: async (req,res) =>
  {
    try
    {
      const {province,nominal} = req.body;
      const {id} = req.params
      const accommodation = await AccommodationCost.findOne({_id: id});
      if(!accommodation)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/costs/accommodations');
      }
      const nominalInt = parseInt((nominal.split('.')[0]).replaceAll(',',''));
      console.log(nominalInt);
      const accommodationUpdate = await AccommodationCost.findOneAndUpdate({_id: id},{nominal: nominalInt,province: province});
      req.flash('alertMessage','Data berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/costs/accommodations');
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

      const accommodation = await AccommodationCost.findOne({_id: id});
      if(!accommodation)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/accommodations');
      }
      await AccommodationCost.findOneAndRemove({_id: id});
      req.flash('alertMessage','Data berhasil dihapus');
      req.flash('alertStatus','success');
      res.redirect('/costs/accommodations');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/costs/accommodations');
    }

  },
}