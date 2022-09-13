const {Grade} = require('../models');
module.exports = {
  index: async (req,res,next) =>
  {
    try
    {
      const grades = await Grade.find().sort({updatedAt: -1});
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        current: 'grades',
        title: 'Pangkat',
        view: '../grade/index.ejs',
        js: '../grade/js.ejs',
        css: '../grade/css.ejs',
        grades: grades,
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
        current: 'grades',
        type: 'Tambah',
        js: '../grade/js.ejs',
        css: '../grade/css.ejs',
        view: '../grade/createOrUpdate.ejs',
        action: '/grades/create',
        alert: alert
      });
    } catch(error)    
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/grades');
    }
  },

  store: async (req,res,next) =>
  {
    try
    {
      const {name} = req.body;
      const grade = await Grade({name: name});
      await grade.save();
      req.flash('alertMessage','Data berhasil ditambahkan');
      req.flash('alertStatus','success');
      return res.redirect('/grades');
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
    const grade = await Grade.findOne({_id: id});
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = {
      message: alertMessage,
      status: alertStatus
    }
    if(!grade)
    {
      req.flash('alertMessage','Data tidak ditemukan');
      req.flash('alertStatus','danger');
      res.redirect('/grades');
    }
    res.render('layouts/index',{
      title: 'Ubah Data Provinsi',
      current: 'grades',
      type: 'Tambah',
      view: '../grade/createOrUpdate.ejs',
      grade: grade,
      action: '/grades/' + id + '/edit?_method=PUT',
      js: '../grade/js.ejs',
      css: '../grade/css.ejs',
      alert: alert
    });
  },
  update: async (req,res) =>
  {
    try
    {
      const {name} = req.body;
      const {id} = req.params
      const grade = await Grade.findOne({_id: id});
      if(!grade)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/grades');
      }
      const gradeUpdate = await Grade.findOneAndUpdate({_id: id},{name: name});
      req.flash('alertMessage','Data berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/grades');
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

      const grade = await Grade.findOne({_id: id});
      if(!grade)
      {
        req.flash('alertMessage','Data tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/grades');
      }
      await Grade.findOneAndRemove({_id: id});
      req.flash('alertMessage','Data berhasil dihapus');
      req.flash('alertStatus','success');
      res.redirect('/grades');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/grades');
    }

  },
}