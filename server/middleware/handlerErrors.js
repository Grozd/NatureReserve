const HttpError = require('../error/httpError')

module.exports = (err, req, res, next) => {
    //console.log('handlerErrors--->', err);
    
    if(err instanceof HttpError) {
        switch (err.status) {
            case 500:
                res.status(err.status).json({message: "Server error"})
                break;
            case 401:
                res.status(err.status).json({message: "Unautorized"})
                break;
            case 400:
                res.status(err.status).json(err.message)
                break;
        }
        res.end()
    } else {
        res.status(500).json({message: "Server error"})
        res.end()
    }
}