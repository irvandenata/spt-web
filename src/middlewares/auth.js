const {User} = require("../models");

module.exports = {
  isAuthenticated: (req,res,next) =>
  {
    console.log(req.session);
    if(req.session.user)
    {
      user = User.findOne({_id: req.session.user.id});
      if(user)
      {
        return next();
      }
    }
    req.flash('alertMessage','Anda harus login terlebih dahulu');
    req.flash('alertStatus','danger');
    res.redirect('/auth');
  }
}