const router = require('express').Router();
const {index,create,store,show,update,destroy} = require('../controllers/groupController');

router.get('/',index);
router.get('/create',create);
router.post('/create',store);
router.get('/:id/edit',show);
router.put('/:id/edit',update);
router.delete('/delete/:id',destroy);

module.exports = router;