var express = require('express');
var router = express.Router();
const district = require('./district')
const auth = require('./auth');
const user = require('./user');
const province = require('./province');
const grade = require('./grade');
const group = require('./group');
const position = require('./position');
const cost = require('./cost');
const {index} = require('../controllers/dashboardController');
/* GET home page. */

router.use('/districts',district);
router.use('/auth',auth);
router.use('/users',user);
router.use('/provinces',province);
router.use('/grades',grade);
router.use('/groups',group);
router.use('/positions',position);
router.use('/costs',cost);
router.get('/dashboard',index);
router.get('/',function (req,res,next)
{
  res.redirect('/auth');
});

module.exports = router;
