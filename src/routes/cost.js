const router = require('express').Router();
const daily = require('../controllers/cost/dailyController');
const transport = require('../controllers/cost/transportController');
const ticket = require('../controllers/cost/ticketController');
const accommodation = require('../controllers/cost/accommodationController');
const rent = require('../controllers/cost/rentController');

router.get('/dailys',daily.index);
router.get('/dailys/create',daily.create);
router.post('/dailys/create',daily.store);
router.get('/dailys/:id/edit',daily.show);
router.put('/dailys/:id/edit',daily.update);
router.delete('/dailys/delete/:id',daily.destroy);


router.get('/transports',transport.index);
router.get('/transports/create',transport.create);
router.post('/transports/create',transport.store);
router.get('/transports/:id/edit',transport.show);
router.put('/transports/:id/edit',transport.update);
router.delete('/transports/delete/:id',transport.destroy);


router.get('/accommodations',accommodation.index);
router.get('/accommodations/create',accommodation.create);
router.post('/accommodations/create',accommodation.store);
router.get('/accommodations/:id/edit',accommodation.show);
router.put('/accommodations/:id/edit',accommodation.update);
router.delete('/accommodations/delete/:id',accommodation.destroy);


router.get('/tickets',ticket.index);
router.get('/tickets/create',ticket.create);
router.post('/tickets/create',ticket.store);
router.get('/tickets/:id/edit',ticket.show);
router.put('/tickets/:id/edit',ticket.update);
router.delete('/tickets/delete/:id',ticket.destroy);

router.get('/rents',rent.index);
router.get('/rents/create',rent.create);
router.post('/rents/create',rent.store);
router.get('/rents/:id/edit',rent.show);
router.put('/rents/:id/edit',rent.update);
router.delete('/rents/delete/:id',rent.destroy);

module.exports = router;