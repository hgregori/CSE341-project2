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

module.exports = {
    validationCreate,
    validationUpdate,
    validationDelete
};