// TODO: это пример , не реализация
module.exports = function(req, res, next) {
    const {role} = req.body
    if(role === 'ADMIN') {
        req.admin = true
    }
    next()
}