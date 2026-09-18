const router = require('express').Router();

const dishesController = require('../controllers/dishes.js');

router.get('/dishes', dishesController.getAll);
// router.get('/dishes', (req, res) => {
//     res.send('Dishes');
// });

module.exports = router;