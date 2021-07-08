class HttpError extends Error{
    constructor(status, message, err) {
        super()
        this.name = this.constructor.name
        this.message = message
        this.primary = err
        this.status = status
    }

    /**
     * 
     * TODO: обрабатывать различие в типах ошибок. 
     * @param {*} status 
     * @param {*} message 
     * @param {*} err 
     */

    static catchError(status, message, err) {
        if(err instanceof ReferenceError) {
            return new HttpError(status, message, err)
        }
        if(err instanceof TypeError) {
            return new HttpError(status, message, err)
        }
        if(err instanceof RangeError) {
            return new HttpError(status, message, err)
        }
        
    }
}
    
module.exports = HttpError