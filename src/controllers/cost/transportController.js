const {TransportCost,District} = require('../../models');
module.exports = {
  index: async (req,res,next) =>
  {
    try
    {
      const transports = await TransportCost.find().sort({updatedAt: -1}).populate('district');
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        current: 'costs/transports',
        title: 'Anggaran Uang Transportasi',
        view: '../cost/transport/index.ejs',
        js: '../cost/transport/js.ejs',
        css: '../cost/transport/css.ejs',
        transports: transports,
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
      const districts = await District.find().sort({name: 1});
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        title: 'Data Anggaran Uang Transportasi',
        current: 'transports',
        type: 'Tambah',
        js: '../cost/transport/js.ejs',
        css: '../cost/transport/css.ejs',
        view: '../cost/transport/createOrUpdate.ejs',
        action: '/costs/transports/create',
        alert: alert,
        districts: districts
      });
    } catch(error)    
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/transports');
    }
  },

  store: async (req,res,next) =>
  {
    try
    {
      const {district,nominal} = req.body;
      const nominalInt = parseInt((nominal.split('.')[0]).replaceAll(',',''));
      const transport = await TransportCost({district: district,nominal: nominalInt});
      await transport.save();
      req.flash('alertMessage','Data berhasil ditambahkan');
      req.flash('alertStatus','success');
      return res.redirect('/costs/transports');
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
    const transport = await TransportCost.findOne({_id: id}).populate('district');
    const districts = await District.find();
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = {
      message: alertMessage,
      status: alertStatus
    }
    if(!transport)
    {
      req.flash('alertMessage','Data tidak ditemukan');
      req.flash('alertStatus','danger');
      res.redirect('/transports');
    }
    res.render('layouts/index',{
      title: 'Data Anggaran Uang Harian',
      current: 'transports',
      type: 'Tambah',
      view: '../cost/transport/createOrUpdate.ejs',
      transport: transport,
      action: '/costs/transports/' + id + '/edit?_method=PUT',
      js: '../cost/transport/js.ejs',
      css: '../cost/transport/css.ejs',
      alert: alert,
      districts: districts
    });
  },
  update: async (req,res) =>
  {
    try
    {
      const {district,nominal} = req.body;
      const {id} = req.params
      const transport = await TransportCost.findOne({_id: id});
      if(!transport)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/costs/transports');
      }
      const nominalInt = parseInt((nominal.split('.')[0]).replaceAll(',',''));
      const transportUpdate = await TransportCost.findOneAndUpdate({_id: id},{nominal: nominalInt,district: district});
      req.flash('alertMessage','Data berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/costs/transports');
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

      const transport = await TransportCost.findOne({_id: id});
      if(!transport)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/transports');
      }
      await TransportCost.findOneAndRemove({_id: id});
      req.flash('alertMessage','Data berhasil dihapus');
      req.flash('alertStatus','success');
      res.redirect('/costs/transports');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/costs/transports');
    }

  },
}