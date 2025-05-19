const { body, param, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const allGenres = [
    'Acción', 'Aventura', 'RPG', 'Shooter', 'Puzzle',
    'Platformas', 'Estrategia', 'Deportes', 'Carreras', 'Simulación',
    'Lucha', 'Terror', 'Survival', 'MMO', 'Sandbox'
];


const allPlatforms = [
    'PC', 'PlayStation', 'PS2', 'PS3', 'PS4', 'PS5',
    'Xbox', 'Xbox 360', 'Xbox One', 'Xbox Series X',
    'Switch', 'Nintendo DS', 'Nintendo 3DS', 'Wii', 'Wii U',
    'Android', 'iOS', 'Mac', 'Linux', 'Other'
];

const createGameValidations = [
    body('title')
        .notEmpty()
        .withMessage('El titulo es requerido')
        .isString()
        .withMessage('El titulo debe ser texto'),
    
    body('description')
        .optional()
        .isString()
        .withMessage('La descripción debe ser texto'),

    body('genre')
        .isArray({ min: 1 })
        .withMessage('Debe proporcionar al menos un género')
        .custom((values) => values.every(v => allGenres.includes(v)))
        .withMessage('Uno o más géneros no son válidos'),

    body('platform')
        .isArray({ min: 1 })
        .withMessage('Debe proporcionar al menos una plataforma')
        .custom((values) => values.every(v => allPlatforms.includes(v)))
        .withMessage('Una o más plataformas no son válidas'),

    body('status')
        .notEmpty()
        .withMessage('El estado es requerido')
        .isIn(['No juagados', 'Jugando', 'Finalizado'])
        .withMessage('El estado debe ser No jugados, Jugando o Finalizado'),

    body('rating')
        .optional()
        .isFloat({ min: 1, max: 5 })
        .withMessage('La valoración debe estar entre 1 y 5'),

    body('notes')
        .optional()
        .isString()
        .withMessage('Las notas deben ser texto'),

    body('rawgImage')
        .optional()
        .isURL()
        .withMessage('rawgImage debe ser una URL válida'),
        
    validateResult
];


const updateGameValidations = [
    param('id')
        .notEmpty()
        .withMessage('El ID es requerido')
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),
   
    body('description')
        .optional()
        .isString()
        .withMessage('La descripción debe ser texto'),

    body('status')
        .notEmpty()
        .withMessage('El estado es requerido')
        .isIn(['No juagados', 'Jugando', 'Finalizado'])
        .withMessage('El estado debe ser No jugados, Jugando o Finalizado'),
    
    body('rating')
        .optional()
        .isFloat({ min: 1, max: 5 })
        .withMessage('La valoración debe estar entre 1 y 5'),

    body('notes')
        .optional()
        .isString()
        .withMessage('Las notas deben ser texto'),
    
    validateResult
];

const getGameValidations = [
    param('id')
        .optional()
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),
    validateResult
];

const deleteGameValidations = [
    param('id')
        .optional()
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),
    validateResult
];

module.exports = { createGameValidations, updateGameValidations, getGameValidations, deleteGameValidations }; 