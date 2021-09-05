const HttpError = require('../error/httpError')
const {User} = require('../model/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator/check');

const generateJWT = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class authenController {

    async registration(req, res, next) {
        try{

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(HttpError.requestError(400, {
                    repeat_password : {
                        isExistErr: true,
                        error: "Недопустимые данные"
                    }
                }))
            }
            
            const {email, password, role} = req.body
            const existingUser = await User.findOne({where: {email}})

            if(existingUser) {

                return next(HttpError.requestError(400, {
                    repeat_password : {
                        isExistErr: true,
                        error: "Пользователь с таким именем уже существует"
                    }
                }))
            }

            const hashPassword = bcrypt.hashSync(password, 5)

            const modelUser = await User.create({email, password: hashPassword, role})

            const token = generateJWT(modelUser.id)

            // send token
            //res.set('Cache-Control', 'private')

            res.status(200).json({
                repeat_password : {
                    isExistErr: false,
                    defaultVal: "Пользователь успешно зарегистрирован"
                },
                token
            })
            
        }catch (e) {
            return next(HttpError.serverError(err, `метод registration файла ${__filename}`))
        }
    }

    async login(req, res, next){
        try{
            console.log('login');
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                // массив переделать в более удобный вид
                return next(HttpError.requestError(400, {
                    password : {
                        isExistErr: true,
                        error: "Недопустимые данные"
                    }
                }))
            }

            const {email, password} = req.body
            const modelUser = await User.findOne({
                where: {
                    email: email
                }
            })

            console.log('modelUser-->', modelUser);

            if(!modelUser) {

                return next(HttpError.requestError(400,
                    {
                        email : {
                            isExistErr: true,
                            error: "Пользователь с таким email не найден"
                        }
                    }))
            }

            const comparePass = bcrypt.compareSync(password, modelUser.password)

            if(comparePass) {
                const token = generateJWT(modelUser.id)
                res.status(200).json({
                    password: {
                        isExistErr: false,
                        defaultVal: "Аутентификация успешна"
                    },
                    token
                })
            } else {
                res.status(400).json({
                    password: {
                        isExistErr: true,
                        error: "Пароль указан неверно"
                    }
                })
            }
            return



            bcrypt.hash(password, 5)
                .then((hash)=> {
                    bcrypt.compare(modelUser.password, hash)
                    .then((result)=>{
                        if(result) {
                            console.log('compare modelUser.id-->', modelUser.id);
                            const token = generateJWT(modelUser.id)

                            return res.status(200).json({
                                password: {
                                    isExistErr: false,
                                    defaultVal: "Аутентификация успешна"
                                },
                                token
                            })
                        } else {
                            
                            return res.status(400).json({
                                password: {
                                    isExistErr: true,
                                    error: "Пароль указан неверно"
                                }
                            })
                        }
                        // send token
                        //res.set('Cache-Control', 'private')
                    })
                    .catch((err)=>{
                        console.log('error compare');
                        next(HttpError.serverError(err, `метод login файла ${__filename}`))
                    })
                })

        } catch(err) {

            return next(HttpError.serverError(err, `метод login файла ${__filename}`))
        }
    }
}

module.exports = new authenController()