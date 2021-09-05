const {format, transports, createLogger} = require('winston');
const {printf, timestamp, combine, json} = format;

const textFormat = printf(({level, message, timestamp}) => {
    return `${timestamp} ${level}: ${message}`
})

const jsonFormat = json(({level, message, timestamp}) => {
    return `${timestamp} ${level}: ${message}`
})

const options = {
    file: {
        level: 'info',
        filename: 'logs/app.log',
        handleExceptions: true,
        maxsize: 5242880,
        maxFiles: 5,
        format: combine(format.timestamp({format: 'DD-MM-YYYY HH:mm:ss'}), jsonFormat)
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        format: combine(format.colorize(), timestamp({format: 'DD-MM-YYYY HH:mm:ss'}), textFormat)
    }
}

const logger = new createLogger({
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console)
    ],
    exitOnError: false
})

logger.stream = {
    write: function(message, encoding) {
        logger.info(message)
    }
}

module.exports = logger