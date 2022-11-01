const { validateResult } =  require('express-validator');
const  validationResult = (req, res, next ) => {
    try {
        validateResult(req).throw()
        return next()
    } catch (error) {
        res.status(403)
        res.send({error: error.array()})
    }
}