const router = require('express').Router();

const dishesController = require('../controllers/dishes.js');
const validationMethod = require('../controllers/validation.js')

router.get('/dishes', dishesController.getAll);

router.get('/dishes/:id', dishesController.getSingle);

router.post('/dishes', validationMethod.validationCreate, dishesController.createDishe);

router.put('/dishes/:id', validationMethod.validationUpdate, dishesController.updateDishe);

router.delete('/dishes/:id', validationMethod.validationDelete, dishesController.deleteDishe);

module.exports = router;