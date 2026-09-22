const { ObjectId } = require('mongodb');

const validationCreate = (req, res, next) => {
    const errors = [];
    const { name, ingredients, price, available_sizes } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        errors.push('Name is required and must be a non-empty string.');
    }

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        errors.push('Ingredients is required and must be a non-empty array.');
    }

    if (price === undefined || price === null || typeof price !== 'number' || price < 0) {
        errors.push('Price is required and must be a positive number.');
    }

    if (!available_sizes || !Array.isArray(available_sizes) || available_sizes.length === 0) {
        errors.push('Available sizes is required and must be a non-empty array.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

const validationUpdate = (req, res, next) => {
    const errors = [];
    const { name, ingredients, price, available_sizes } = req.body;

    if (!ObjectId.isValid(req.params.id)) {
        errors.push('Invalid dish ID.');
    }

    if (!name || typeof name !== 'string' || name.trim() === '') {
        errors.push('Name is required and must be a non-empty string.');
    }

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        errors.push('Ingredients is required and must be a non-empty array.');
    }

    if (price === undefined || price === null || typeof price !== 'number' || price < 0) {
        errors.push('Price is required and must be a positive number.');
    }

    if (!available_sizes || !Array.isArray(available_sizes) || available_sizes.length === 0) {
        errors.push('Available sizes is required and must be a non-empty array.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

const validationDelete = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ errors: ['Invalid dish ID.'] });
    }

    next();
};

// -#-#-#-#-#-#-#-#-#-#-#-#- Games Validation -#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#- //

const validationCreateGame = (req, res, next) => {
    const errors = [];
    const { title, studio, releaseDate, price } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        errors.push('Title is required and must be a non-empty string.');
    }

    if (!studio || typeof studio !== 'string' || studio.trim() === '') {
        errors.push('Studio is required and must be a non-empty string.');
    }

    if (!releaseDate || typeof releaseDate !== 'string' || releaseDate.trim() === '') {
        errors.push('Release date is required and must be a non-empty string.');
    } else if (isNaN(Date.parse(releaseDate))) {
        errors.push('Release date must be a valid date.');
    }

    if (price === undefined || price === null || typeof price !== 'number' || price < 0) {
        errors.push('Price is required and must be a positive number.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

const validationUpdateGame = (req, res, next) => {
    const errors = [];
    const { title, studio, releaseDate, price } = req.body;

    if (!ObjectId.isValid(req.params.id)) {
        errors.push('Invalid game ID.');
    }

    if (!title || typeof title !== 'string' || title.trim() === '') {
        errors.push('Title is required and must be a non-empty string.');
    }

    if (!studio || typeof studio !== 'string' || studio.trim() === '') {
        errors.push('Studio is required and must be a non-empty string.');
    }

    if (!releaseDate || typeof releaseDate !== 'string' || releaseDate.trim() === '') {
        errors.push('Release date is required and must be a non-empty string.');
    } else if (isNaN(Date.parse(releaseDate))) {
        errors.push('Release date must be a valid date.');
    }

    if (price === undefined || price === null || typeof price !== 'number' || price < 0) {
        errors.push('Price is required and must be a positive number.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

const validationDeleteGame = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ errors: ['Invalid game ID.'] });
    }

    next();
};

module.exports = {
    // Dishes validations
    validationCreate,
    validationUpdate,
    validationDelete,
    validationCreateDish: validationCreate,
    validationUpdateDish: validationUpdate,
    validationDeleteDish: validationDelete,

    // Games validations
    validationCreateGame,
    validationUpdateGame,
    validationDeleteGame
};