const Bank = require('../models/bank');
const fs = require('fs-extra');
const path = require('path');
const config = require('../../config');
module.exports = {
  index: async (req,res,next) =>
  {
    try
    {

      const banks = await Bank.find().sort({updatedAt: -1});
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        current: 'bank',
        title: 'Bank',
        view: '../bank/index.ejs',
        js: '../bank/js.ejs',
        css: '../bank/css.ejs',
        banks: banks,
        alert: alert
      });
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/bank');
    }
  },
  create: async (req,res,next) =>
  {
    try
    {
      res.render('layouts/index',{
        title: 'Tambah Bank',
        current: 'bank',
        type: 'Tambah',
        js: '../bank/js.ejs',
        css: '../bank/css.ejs',
        view: '../bank/createOrUpdate.ejs',
        action: '/bank/create',
      });
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/bank');
    }
  },
  store: async (req,res,next) =>
  {
    try
    {
      const {name,owner,bankNumber} = req.body;
      let filename = '';
      console.log(req.files);
      if(req.file)
      {
        let name = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(let i = 0; i < 6; i++)
          name += possible.charAt(Math.floor(Math.random() * possible.length));
        let tempPath = req.file.path;
        let originalName = name;
        let originalExtension = req.file.originalname.split('.').pop();
        let dir = 'bank';
        filename = `${dir}/${originalName}.${originalExtension}`;
        let targetPath = path.resolve(`${config.rootPath}/public/images/${filename}`);
        if(!fs.existsSync(`${config.rootPath}/public/images/${dir}`))
        {
          await fs.mkdirSync(`${config.rootPath}/public/images/${dir}`);
        }
        const src = fs.createReadStream(tempPath);
        const dest = fs.createWriteStream(targetPath);
        src.pipe(dest);
        src.on('end',async () =>
        {
          fs.unlink(tempPath,(err) =>
          {
            if(err) throw err;
          });
        }).on('error',(err) => console.log(err));
      }
      const bank = await Bank({name: name,image: filename,owner: owner,bankNumber: bankNumber});
      await bank.save();
      req.flash('alertMessage','Bank berhasil ditambahkan');
      req.flash('alertStatus','success');
      res.redirect('/bank');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/bank');
    }
  },
  edit: async (req,res) =>
  {
    const {id} = req.params
    const bank = await Bank.findOne({_id: id});
    res.render('layouts/index',{
      title: 'Ubah Bank',
      current: 'bank',
      type: 'Tambah',
      view: '../bank/createOrUpdate.ejs',
      bank: bank,
      action: '/bank/edit/' + id + '?_method=PUT',
      js: '../bank/js.ejs',
      css: '../bank/css.ejs'
    });
  },
  update: async (req,res) =>
  {
    try
    {
      const {name,owner,bankNumber} = req.body;
      const {id} = req.params
      const bank = await Bank.findOne({_id: id});
      let filename = bank.image;
      if(req.file)
      {
        let name = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(let i = 0; i < 6; i++)
          name += possible.charAt(Math.floor(Math.random() * possible.length));
        let tempPath = req.file.path;
        let originalName = name;
        let originalExtension = req.file.originalname.split('.').pop();
        let dir = 'bank';
        filename = `${dir}/${originalName}.${originalExtension}`;
        let targetPath = path.resolve(`${config.rootPath}/public/images/${filename}`);
        if(!fs.existsSync(`${config.rootPath}/public/images/${dir}`))
        {
          await fs.mkdirSync(`${config.rootPath}/public/images/${dir}`);
        }
        const src = fs.createReadStream(tempPath);
        const dest = fs.createWriteStream(targetPath);
        src.pipe(dest);
        src.on('end',async () =>
        {
          let currentImage = `${config.rootPath}/public/images/${bank.image}`;
          if(fs.existsSync(currentImage))
          {
            fs.unlink(currentImage,(err) =>
            {
              if(err) throw err;
            });
          }

          fs.unlink(tempPath,(err) =>
          {
            if(err) throw err;
          });
        }).on('error',(err) => console.log(err));
      }
      const bankUpdate = await Bank.findOneAndReplace({_id: id},{name: name,image: filename,owner: owner,bankNumber: bankNumber});

      req.flash('alertMessage','Bank berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/bank');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/bank');
    }

  },
  destroy: async (req,res) =>
  {
    try
    {
      const {id} = req.params;

      const bank = await Bank.findOne({_id: id});
      if(fs.existsSync(`${config.rootPath}/public/images/${bank.image}`))
      {
        fs.unlink(`${config.rootPath}/public/images/${bank.image}`,(err) =>
        {
          if(err) throw err;
        });
      }
      await Bank.findOneAndRemove({_id: id});
      req.flash('alertMessage','Bank berhasil dihapus');
      req.flash('alertStatus','success');
      res.redirect('/bank');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/bank');
    }

  },

}