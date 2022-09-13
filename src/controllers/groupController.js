const {Group} = require('../models');
module.exports = {
  index: async (req,res,next) =>
  {
    try
    {
      const groups = await Group.find().sort({updatedAt: -1});
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        current: 'groups',
        title: 'Pangkat',
        view: '../group/index.ejs',
        js: '../group/js.ejs',
        css: '../group/css.ejs',
        groups: groups,
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
        current: 'groups',
        type: 'Tambah',
        js: '../group/js.ejs',
        css: '../group/css.ejs',
        view: '../group/createOrUpdate.ejs',
        action: '/groups/create',
        alert: alert
      });
    } catch(error)    
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/groups');
    }
  },

  store: async (req,res,next) =>
  {
    try
    {
      const {name} = req.body;
      const group = await Group({name: name});
      await group.save();
      req.flash('alertMessage','Data berhasil ditambahkan');
      req.flash('alertStatus','success');
      return res.redirect('/groups');
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
    const group = await Group.findOne({_id: id});
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = {
      message: alertMessage,
      status: alertStatus
    }
    if(!group)
    {
      req.flash('alertMessage','Data tidak ditemukan');
      req.flash('alertStatus','danger');
      res.redirect('/groups');
    }
    res.render('layouts/index',{
      title: 'Ubah Data Provinsi',
      current: 'groups',
      type: 'Tambah',
      view: '../group/createOrUpdate.ejs',
      group: group,
      action: '/groups/' + id + '/edit?_method=PUT',
      js: '../group/js.ejs',
      css: '../group/css.ejs',
      alert: alert
    });
  },
  update: async (req,res) =>
  {
    try
    {
      const {name} = req.body;
      const {id} = req.params
      const group = await Group.findOne({_id: id});
      if(!group)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/groups');
      }
      const groupUpdate = await Group.findOneAndUpdate({_id: id},{name: name});
      req.flash('alertMessage','Data berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/groups');
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

      const group = await Group.findOne({_id: id});
      if(!group)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/groups');
      }
      await Group.findOneAndRemove({_id: id});
      req.flash('alertMessage','Data berhasil dihapus');
      req.flash('alertStatus','success');
      res.redirect('/groups');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/groups');
    }

  },
}