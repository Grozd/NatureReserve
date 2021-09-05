const HttpError = require('../error/httpError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class authenController {

    async check(req, res, next){
        try {

            const token = req.headers['authorisation']
            console.log('token----->', token);
            if(!token) {
                console.log('нет токена');

                res.set('WWW-Authenticate', 'Bearer realm="Access to the staging site", charset="UTF-8" ')
                res.status(401).end()

            } else {
                console.log('есть токен');
                // compare wiht secret
                res.status(200).json({message:'authorized'})
            }

        } catch (error) {
            console.log('catch check');
            next(HttpError.serverError(error, __filename))
        }        
    }
}

module.exports = new authenController()