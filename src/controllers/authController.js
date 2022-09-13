const {User} = require('../models');
const bycrypt = require('bcryptjs');
module.exports = {
  index: async (req,res,next) =>
  {
    try
    {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/auth',{
        current: 'login',
        title: 'Login',
        view: '../auth/login.ejs',
        alert: alert
      });
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/auth');
    }
  },
  login: async (req,res,next) =>
  {
    try
    {
      const {email,password} = req.body;
      const user = await User.findOne({email: email});
      if(!user)
      {
        req.flash('alertMessage','User Not Found');
        req.flash('alertStatus','danger');
        res.redirect('/auth');
      }
      console.log(user);
      console.log(password);
      const isPasswordMatch = await bycrypt.compare(password,user.password);
      if(!isPasswordMatch)
      {
        req.flash('alertMessage','Password Salah');
        req.flash('alertStatus','danger');
        return res.redirect('/auth');
      }
      req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
      res.redirect('/dashboard');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/auth');
    }
  }
}