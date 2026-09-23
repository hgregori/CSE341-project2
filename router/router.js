// -#-#-#-#-#-#-#-#-#-#-#-#- Controlls and Libraries -#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#- //

const router = require('express').Router();
const passport = require('passport');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const dishesController = require('../controllers/dishes.js');
const gamesController = require('../controllers/games.js');     
const validationMethod = require('../controllers/validation.js')

const authenticateController = require('../controllers/authenticate.js');

// -#-#-#-#-#-#-#-#-#-#-#-#- Dishes Paths -#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#- //

router.get('/dishes',authenticateController.isAuthenticated, dishesController.getAllDishes);

router.get('/dishes/:id',authenticateController.isAuthenticated, dishesController.getSingleDish);

router.post('/dishes',authenticateController.isAuthenticated, validationMethod.validationCreateDish, dishesController.createDishe);

router.put('/dishes/:id',authenticateController.isAuthenticated, validationMethod.validationUpdateDish, dishesController.updateDishe);

router.delete('/dishes/:id',authenticateController.isAuthenticated, validationMethod.validationDeleteDish, dishesController.deleteDishe);

// -#-#-#-#-#-#-#-#-#-#-#-#- Games Paths -#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#- //

router.get('/games',authenticateController.isAuthenticated, gamesController.getAllGames);

router.get('/games/:id',authenticateController.isAuthenticated, gamesController.getSingleGame);

router.post('/games',authenticateController.isAuthenticated, validationMethod.validationCreateGame, gamesController.createGame);

router.put('/games/:id',authenticateController.isAuthenticated, validationMethod.validationUpdateGame, gamesController.updateGame);

router.delete('/games/:id',authenticateController.isAuthenticated, validationMethod.validationDeleteGame, gamesController.deleteGame);

// -#-#-#-#-#-#-#-#-#-#-#-#- Swagger Paths -#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#- //

router.use('/api-docs', swaggerUi.serve);

router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// -#-#-#-#-#-#-#-#-#-#-#-#- Authentication Paths -#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#- //

router.get('/login', passport.authenticate('github', (req, res) => {
}));

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { 
            return next(err);
        }
        req.session.user = undefined;
        console.log('Logged out');
        res.redirect('/');
    });
});

router.get('/', (req, res) => 
    {
        res.send(req.session.user !== undefined? 'Logged in as ' + req.session.user.username: 'Logged Out')
    }
);

router.get('/github/callback', 
    passport.authenticate('github', 
    { failureRedirect: '/api-docs', 
        session: false }), 
        (req, res) => {
            req.session.user = req.user;
            res.redirect('/');
        }
);

// -#-#-#-#-#-#-#-#-#-#-#-#- Modules Export -#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#- //
module.exports = router;