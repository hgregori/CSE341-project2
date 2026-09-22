// -#-#-#-#-#-#-#-#-#-#-#-#- Controlls and Libraries -#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#- //

const router = require('express').Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const dishesController = require('../controllers/dishes.js');
const gamesController = require('../controllers/games.js');
const validationMethod = require('../controllers/validation.js')

// -#-#-#-#-#-#-#-#-#-#-#-#- Dishes Paths -#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#- //

router.get('/dishes', dishesController.getAllDishes);

router.get('/dishes/:id', dishesController.getSingleDish);

router.post('/dishes', validationMethod.validationCreateDish, dishesController.createDishe);

router.put('/dishes/:id', validationMethod.validationUpdateDish, dishesController.updateDishe);

router.delete('/dishes/:id', validationMethod.validationDeleteDish, dishesController.deleteDishe);

// -#-#-#-#-#-#-#-#-#-#-#-#- Games Paths -#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#- //

router.get('/games', gamesController.getAllGames);

router.get('/games/:id', gamesController.getSingleGame);

router.post('/games', validationMethod.validationCreateGame, gamesController.createGame);

router.put('/games/:id', validationMethod.validationUpdateGame, gamesController.updateGame);

router.delete('/games/:id', validationMethod.validationDeleteGame, gamesController.deleteGame);

// -#-#-#-#-#-#-#-#-#-#-#-#- Swagger Paths -#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#- //

router.use('/api-docs', swaggerUi.serve);

router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// -#-#-#-#-#-#-#-#-#-#-#-#- Modules Export -#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#- //
module.exports = router;