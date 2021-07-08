const httpError = require('./error/httpError')

module.exports = function(req, res, next) {
    try {
    
        const host = req.header('Origin')
        req.method === 'OPTIONS'
        ? res.set({
            'Access-Control-Allow-Origin': host,
            'Access-Control-Allow-Method': 'GET, POST, OPTIONS'
        })
        : res.set({
            'Access-Control-Allow-Origin': host,
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        })
        next()
    } catch (err) {
        
        next(httpError.catchError(500, '', err))
    }
}