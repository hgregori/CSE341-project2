// -#-#-#-#-#-#-#-#-#-#-#-#- Controlls and Libraries -#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#- //

const router = require('express').Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const dishesController = require('../controllers/dishes.js');
const validationMethod = require('../controllers/validation.js')

// -#-#-#-#-#-#-#-#-#-#-#-#- Dishes Paths -#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#- //

router.get('/dishes', dishesController.getAll);

router.get('/dishes/:id', dishesController.getSingle);

router.post('/dishes', validationMethod.validationCreate, dishesController.createDishe);

router.put('/dishes/:id', validationMethod.validationUpdate, dishesController.updateDishe);

router.delete('/dishes/:id', validationMethod.validationDelete, dishesController.deleteDishe);

// -#-#-#-#-#-#-#-#-#-#-#-#- Swagger Paths -#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#- //

router.use('/api-docs', swaggerUi.serve);

router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// -#-#-#-#-#-#-#-#-#-#-#-#- Modules Export -#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#- //
module.exports = router;