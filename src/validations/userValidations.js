const { body, param, validationResult } = require('express-validator');


const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


const createUserValidations = [
    body('name')
        .optional()
        .isString()
        .withMessage('El nombre debe ser texto'),

    body('username')
        .notEmpty()
        .withMessage('El nombre de usuario es requerido')
        .isString()
        .withMessage('El nombre de usuario debe ser texto'),
    
    body('email')
        .notEmpty()
        .withMessage('El email es requerido')
        .isEmail()
        .withMessage('Debe ser un email válido')
        .normalizeEmail({gmail_remove_dots: false, gmail_remove_subaddress: false}),
    
    body('password')
        .notEmpty()
        .withMessage('La constraseña es requerida')
        .isLength({ min: 8 })
        .withMessage('La constraseña debe tener una longitud minima de 8 carácteres')
        .isStrongPassword({
            minSymbols: 1,
            minUppercase: 1,
            minNumbers: 1
        })
        .withMessage('La constraseña debe tener al menos un símbolo, una mayuscula y un número'),
    
    body('rol')
        .notEmpty()
        .withMessage('El rol es requerido')
        .isIn(['administrador', 'usuario'])
        .withMessage('El rol debe ser administrador o usuario'),
    
    validateResult
];


const updateUserValidations = [
    param('id')
        .notEmpty()
        .withMessage('El ID es requerido')
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),
        body('name')
        .optional()
        .isString()
        .withMessage('El nombre debe ser texto'),

    body('username')
        .notEmpty()
        .withMessage('El nombre de usuario es requerido')
        .isString()
        .withMessage('El nombre de usuario debe ser texto'),
    
    body('email')
        .notEmpty()
        .withMessage('El email es requerido')
        .isEmail()
        .withMessage('Debe ser un email válido')
        .normalizeEmail({ gmail_remove_dots: false, gmail_remove_subaddress: false}),
    
    body('password')
        .optional()
        .isLength({ min: 8 })
        .withMessage('La constraseña debe tener una longitud minima de 8 carácteres')
        .isStrongPassword({
            minSymbols: 1,
            minUppercase: 1,
            minNumbers: 1
        })
        .withMessage('La constraseña debe tener al menos un símbolo, una mayuscula y un número'),
    
    body('rol')
        .optional()
        .isIn(['administrador', 'usuario'])
        .withMessage('El rol debe ser administrador o usuario'),
    
    validateResult
];


const getUserValidations = [
    param('id')
        .optional()
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),
    validateResult
];

const deleteUserValidations = [
    param('id')
        .optional()
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),
    validateResult
];

const loginValidations = [
    body('username')
        .notEmpty()
        .withMessage('El nombre de usuario es requerido')
        .isString()
        .withMessage('El nombre de usuario debe ser texto'),

        body('password')
        .notEmpty()
        .withMessage('La constraseña es requerida')
        .isLength({ min: 8 })
        .withMessage('La constraseña debe tener una longitud minima de 8 carácteres')
        .isStrongPassword({
            minSymbols: 1,
            minUppercase: 1,
            minNumbers: 1
        }),

    validateResult
];

module.exports = { createUserValidations, updateUserValidations, getUserValidations, deleteUserValidations, loginValidations }; 