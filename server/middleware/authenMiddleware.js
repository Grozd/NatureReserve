// TODO: это заглушка , не реализация
module.exports = function(req, res, next) {
    const {role} = req.body
    if(!role) {
        req.admin = 'USER'
        next()
    }
    if(role === 'ADMIN') {
        req.admin = true
        next()
    }
}