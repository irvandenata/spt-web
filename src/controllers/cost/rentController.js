const {RentCost,Province} = require('../../models');
module.exports = {
  index: async (req,res,next) =>
  {
    try
    {
      const rents = await RentCost.find().sort({updatedAt: -1}).populate('province');
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        current: 'costs/rents',
        title: 'Anggaran Uang Penginapan',
        view: '../cost/rent/index.ejs',
        js: '../cost/rent/js.ejs',
        css: '../cost/rent/css.ejs',
        rents: rents,
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
        title: 'Data Anggaran Uang Sewa Kendaraan',
        current: 'rents',
        type: 'Tambah',
        js: '../cost/rent/js.ejs',
        css: '../cost/rent/css.ejs',
        view: '../cost/rent/createOrUpdate.ejs',
        action: '/costs/rents/create',
        alert: alert,
        provinces: provinces
      });
    } catch(error)    
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/rents');
    }
  },

  store: async (req,res,next) =>
  {
    try
    {
      const {province,nominal} = req.body;
      const nominalInt = parseInt((nominal.split('.')[0]).replaceAll(',',''));
      const rent = await RentCost({province: province,nominal: nominalInt});
      await rent.save();
      req.flash('alertMessage','Data berhasil ditambahkan');
      req.flash('alertStatus','success');
      return res.redirect('/costs/rents');
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
    const rent = await RentCost.findOne({_id: id}).populate('province');
    const provinces = await Province.find();
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = {
      message: alertMessage,
      status: alertStatus
    }
    if(!rent)
    {
      req.flash('alertMessage','Data tidak ditemukan');
      req.flash('alertStatus','danger');
      res.redirect('/rents');
    }
    res.render('layouts/index',{
      title: 'Data Anggaran Uang Harian',
      current: 'rents',
      type: 'Tambah',
      view: '../cost/rent/createOrUpdate.ejs',
      rent: rent,
      action: '/costs/rents/' + id + '/edit?_method=PUT',
      js: '../cost/rent/js.ejs',
      css: '../cost/rent/css.ejs',
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
      const rent = await RentCost.findOne({_id: id});
      if(!rent)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/costs/rents');
      }
      const nominalInt = parseInt((nominal.split('.')[0]).replaceAll(',',''));
      console.log(nominalInt);
      const rentUpdate = await RentCost.findOneAndUpdate({_id: id},{nominal: nominalInt,province: province});
      req.flash('alertMessage','Data berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/costs/rents');
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

      const rent = await RentCost.findOne({_id: id});
      if(!rent)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/rents');
      }
      await RentCost.findOneAndRemove({_id: id});
      req.flash('alertMessage','Data berhasil dihapus');
      req.flash('alertStatus','success');
      res.redirect('/costs/rents');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/costs/rents');
    }

  },
}