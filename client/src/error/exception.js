class CorsException extends Error {
    constructor(message, primary) {
        super()
        this.message = message
        this.name = this.constructor.name
        this.primary = primary
    }
}

class FetchException extends Error {
    constructor(message, primary) {
        super()
        this.message = message
        this.name = this.constructor.name
        this.primary = primary
    }
}



export {CorsException, FetchException}