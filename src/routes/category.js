var express = require('express');
var router = express.Router();
const {index,create,show,update,destroy} = require('../controllers/articleController');

const {multer} = require('../helpers');
/* GET. */
router.get('/',index);
router.post('/',multer.any(),create);
router.get('/:slug',show);
router.put('/:slug',multer.any(),update);
router.delete('/:slug',destroy);

module.exports = router;