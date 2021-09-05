const logger = require('../config/winston')

class HttpError extends Error{
    constructor(status = 500, err = null) {
        super()
        this.name = this.constructor.name
        this.message = err
        this.status = status
    }

    /**
     * 
     * TODO описать больше статусов ошибок и их логгирование
     * @param {*} status 
     * @param {*} message 
     * @param {*} err 
     */

    // status default 500
    static serverError(err, message) {
        
        logger.error('server error ', message)
        return new HttpError(500, err)
    }

    static requestError(status, err) {

        logger.warn(err.message)
        return new HttpError(status, err)
    }
}
    
module.exports = HttpError