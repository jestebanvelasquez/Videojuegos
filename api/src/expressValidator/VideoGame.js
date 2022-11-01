const {check} = require('express-validator')
const  { validateResult } = require ('./validateHelpers')

const validateCreate = [
    check('name')
    .exists()
    .not()
    .isEmpty(),
    check('age')
    .exists()
    .isNumeric(),
    check('email')
    .exists()
    .isEmail(),
    (req, res, next ) => {
        validateResult(req, res, next)
    }

]


module.exports = { validateCreate }