const router = require('express').Router();
const {index,login,show,update,destroy} = require('../controllers/authController');

router.get('/',index);
router.post('/login',login);

module.exports = router;