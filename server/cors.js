const httpError = require('./error/httpError')

module.exports = function(req, res, next) {
    try {
    
        const host = req.header('Origin')
        if(req.method === 'OPTIONS') {
            res.set({
                'Access-Control-Allow-Origin': host,
                'Access-Control-Allow-Method': 'GET,HEAD,PUT,PATCH,POST,DELETE',
                'Access-Control-Allow-Headers': 'Content-Type'
            })
            res.status(204).end()
            return
        } else {
            res.set({
                'Access-Control-Allow-Origin': host,
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            })
        }
        
        next()
        
    } catch (err) {
        console.log('ошибка cors', err);
        next(httpError.serverError(err, 'ошибка cors server'))
    }
}