const {TicketCost,District} = require('../../models');
module.exports = {
  index: async (req,res,next) =>
  {
    try
    {
      const tickets = await TicketCost.find().sort({updatedAt: -1}).populate('from').populate('destination');
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        current: 'costs/tickets',
        title: 'Anggaran Biaya Tiket',
        view: '../cost/ticket/index.ejs',
        js: '../cost/ticket/js.ejs',
        css: '../cost/ticket/css.ejs',
        tickets: tickets,
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
        title: 'Data Anggaran Biaya Tiket',
        current: 'tickets',
        type: 'Tambah',
        js: '../cost/ticket/js.ejs',
        css: '../cost/ticket/css.ejs',
        view: '../cost/ticket/createOrUpdate.ejs',
        action: '/costs/tickets/create',
        alert: alert,
        districts: districts
      });
    } catch(error)    
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/tickets');
    }
  },

  store: async (req,res,next) =>
  {
    try
    {
      const {from,destination,nominal} = req.body;
      const nominalInt = parseInt((nominal.split('.')[0]).replaceAll(',',''));
      const ticket = await TicketCost({from: from,destination: destination,nominal: nominalInt});
      await ticket.save();
      req.flash('alertMessage','Data berhasil ditambahkan');
      req.flash('alertStatus','success');
      return res.redirect('/costs/tickets');
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
    const ticket = await TicketCost.findOne({_id: id}).populate('from').populate('destination');
    const districts = await District.find();
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = {
      message: alertMessage,
      status: alertStatus
    }
    if(!ticket)
    {
      req.flash('alertMessage','Data tidak ditemukan');
      req.flash('alertStatus','danger');
      res.redirect('/tickets');
    }
    res.render('layouts/index',{
      title: 'Data Anggaran Uang Harian',
      current: 'tickets',
      type: 'Tambah',
      view: '../cost/ticket/createOrUpdate.ejs',
      ticket: ticket,
      action: '/costs/tickets/' + id + '/edit?_method=PUT',
      js: '../cost/ticket/js.ejs',
      css: '../cost/ticket/css.ejs',
      alert: alert,
      districts: districts
    });
  },
  update: async (req,res) =>
  {
    try
    {
      const {from,destination,nominal} = req.body;
      const {id} = req.params
      const ticket = await TicketCost.findOne({_id: id});
      if(!ticket)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/costs/tickets');
      }
      const nominalInt = parseInt((nominal.split('.')[0]).replaceAll(',',''));
      const ticketUpdate = await TicketCost.findOneAndUpdate({_id: id},{nominal: nominalInt,from: from,destination: destination});
      req.flash('alertMessage','Data berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/costs/tickets');
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

      const ticket = await TicketCost.findOne({_id: id});
      if(!ticket)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/tickets');
      }
      await TicketCost.findOneAndRemove({_id: id});
      req.flash('alertMessage','Data berhasil dihapus');
      req.flash('alertStatus','success');
      res.redirect('/costs/tickets');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/costs/tickets');
    }

  },
}