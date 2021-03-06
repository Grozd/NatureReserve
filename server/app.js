require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const sequalize = require('./connect_db')
const cors = require('./cors')
const fileUpload = require('express-fileupload')
const router = require('./routes')
const handlerErrors = require('./middleware/handlerErrors')
//const typeis = require('./node_modules/type-is')
//const winston = require('./config/winston')

const port = process.env.APP_PORT || 3000
const host = process.env.APP_HOST || 'localhost'



app.use(cors)
/* app.use((req, res, next)=>{

    let isValidType = typeis(req, ['application/json'])
    console.log('isValidType-->',isValidType);
    next()
}) */
app.use(express.json())
app.use((req, res, next)=>{console.log(req.url, req.method, req.body,'<----------------url'); next()} )
//app.use(express.static(path.resolve(__dirname, 'static')))
app.use(router)
app.use(handlerErrors)


async function start()
{
    try {
        await sequalize.authenticate()
        await sequalize.sync()
        app.listen(port, host, ()=>console.log('Запущен сервер на порте ', port));
    } catch (error) {
        console.log('Ошибка подключения к БД', error);
        process.exit(1);
    }
}

start();




