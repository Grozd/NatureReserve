const { body } = require('express-validator');

module.exports = [
    body('email')
        .notEmpty().withMessage('filds must be fill')
        .isEmail().withMessage('invalid email')
        .isByteLength({min: 8, max: 30}),
    body('password')
        .notEmpty().withMessage('filds must be fill')
        .isByteLength({min: 8, max: 40})

]