const {DailyCost,Province} = require('../../models');
module.exports = {
  index: async (req,res,next) =>
  {
    try
    {
      const dailys = await DailyCost.find().sort({updatedAt: -1}).populate('province');
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        current: 'costs/dailys',
        title: 'Anggaran Uang Harian',
        view: '../cost/daily/index.ejs',
        js: '../cost/daily/js.ejs',
        css: '../cost/daily/css.ejs',
        dailys: dailys,
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
        title: 'Data Anggaran Uang Harian',
        current: 'dailys',
        type: 'Tambah',
        js: '../cost/daily/js.ejs',
        css: '../cost/daily/css.ejs',
        view: '../cost/daily/createOrUpdate.ejs',
        action: '/costs/dailys/create',
        alert: alert,
        provinces: provinces
      });
    } catch(error)    
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/dailys');
    }
  },

  store: async (req,res,next) =>
  {
    try
    {
      const {province,nominal} = req.body;
      console.log(req.body);
      const nominalInt = parseInt((nominal.split('.')[0]).replaceAll(',',''));
      const daily = await DailyCost({province: province,nominal: nominalInt});
      await daily.save();
      req.flash('alertMessage','Data berhasil ditambahkan');
      req.flash('alertStatus','success');
      return res.redirect('/costs/dailys');
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
    const daily = await DailyCost.findOne({_id: id}).populate('province');
    const provinces = await Province.find();
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = {
      message: alertMessage,
      status: alertStatus
    }
    if(!daily)
    {
      req.flash('alertMessage','Data tidak ditemukan');
      req.flash('alertStatus','danger');
      res.redirect('/dailys');
    }
    res.render('layouts/index',{
      title: 'Data Anggaran Uang Harian',
      current: 'dailys',
      type: 'Tambah',
      view: '../cost/daily/createOrUpdate.ejs',
      daily: daily,
      action: '/costs/dailys/' + id + '/edit?_method=PUT',
      js: '../cost/daily/js.ejs',
      css: '../cost/daily/css.ejs',
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
      const daily = await DailyCost.findOne({_id: id});
      if(!daily)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/costs/dailys');
      }
      const nominalInt = parseInt((nominal.split('.')[0]).replaceAll(',',''));
      console.log(nominalInt);
      const dailyUpdate = await DailyCost.findOneAndUpdate({_id: id},{nominal: nominalInt,province: province});
      req.flash('alertMessage','Data berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/costs/dailys');
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

      const daily = await DailyCost.findOne({_id: id});
      if(!daily)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/dailys');
      }
      await DailyCost.findOneAndRemove({_id: id});
      req.flash('alertMessage','Data berhasil dihapus');
      req.flash('alertStatus','success');
      res.redirect('/costs/dailys');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/costs/dailys');
    }

  },
}