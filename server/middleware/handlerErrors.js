const HttpError = require('../error/httpError')

module.exports = (err, req, res, next) => {
    
    if(err instanceof HttpError) {
        res.status(err.status).json({message: err.message})
    }
}