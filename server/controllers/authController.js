const {User} = require('../model/models')
const bcrypt = require('bcrypt')


class authController {
    async registration(req, res, next) {
        try{
            const {email, password, role} = req.body
            const existingUser = await User.findOne({where: {email}})
            if(existingUser) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 5)  
            
            const user = await User.create({email, password: hashPassword, role})  
            res.json({message: "Пользователь успешно зарегистрирован"})
            
        }catch (e) {
            
            res.status(400).json({message: "Registrarion error"})
        }
    }

    async login(req, res){
        try{
            const {email, password} = req.body
            
        }catch(e){
            
            res.status(400).json({message: "Login error"})
        }

    }

    async getUsers(req, res) {
        try{
            if(req.admin === true) {
                const users = await User.findAll()
                res.json({users})
            }

        }catch(e){
            res.status(404).end('Not found')
        }
    }
}

module.exports = new authController()