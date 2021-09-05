
require('dotenv').config()
const http = require('http')
const path = require('path')
const sequalize = require('./connect_db')
const cors = require('./cors')
const router = require('./routes')
const handlerErrors = require('./middleware/handlerErrors')


const port = process.env.APP_PORT || 3000
const host = process.env.APP_HOST || 'localhost'


const server = http.createServer((req, res) => {

  if(req.method === 'OPTIONS') {

    res.setHeader('Access-Control-Allow-Origin', host)
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, OPTIONS')
    
  } else {
    res.setHeader('Access-Control-Allow-Origin', host)
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    
  }
  

    let body = '';

    req.setEncoding('utf8');
  
    req.on('data', (chunk) => {
      console.log('chunk--->',chunk);
      body += chunk;
    });
  
    console.log('body--->',body);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        // Write back something interesting to the user:
        res.write(data);
        res.end();
      } catch (er) {
        // uh oh! bad json!
        res.statusCode = 400;
        return res.end(`error: ${er.message}`);
      }
    });
});

async function start()
{
    try {
        await sequalize.authenticate()
        await sequalize.sync()
        server.listen(port, host, ()=>console.log('Запущен сервер на порте ', port));
    } catch (error) {
        console.log('Ошибка подключения к БД', error);
        process.exit(1);
    }
}

start();




