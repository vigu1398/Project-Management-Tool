const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, errors, prettyPrint, printf } = format;
const appRoot = require('app-root-path');
require('winston-daily-rotate-file');

const transport = new transports.DailyRotateFile({
    filename: 'PMT-%DATE%.log',
    frequency: '5h',
    dirname: `${appRoot}/logs`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '5m',
    maxFiles: '4d'
});

const toWinstonLogLevel = (level) => {
    switch(level) {
        case logLevel.ERROR:
        case logLevel.NOTHING:
            return 'error'
        case logLevel.WARN:
            return 'warn'
        case logLevel.INFO:
            return 'info'
        case logLevel.DEBUG:
            return 'debug'
    }
}
const timezoned = () => {
    return new Date().toLocaleString('en-GB', {
        timeZone: process.env.TIME_ZONE || 'Asia/Kolkata', month: 'short', year: 'numeric',
        day:'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'
    });
}

const logger = createLogger({
    level: (process.env.LOGGER_LEVEL || 'info'),
    format: combine(
        timestamp({
            format: timezoned
        }),
        printf( msg => {
            let message = `[ ${msg.level.toUpperCase()} ${msg.timestamp}`;
            if( msg.url ){
                message = message + ` ${msg.method} ${msg.origin}${msg.url}\n${msg.ip} ${msg.userAgent}`;
            }
            if( msg.broker ){
                message = message + ` KAFKA ${msg.broker} ${msg.error}`
            }
            message = message + ` - ${msg.message}`;
            if( msg.stack )
                message = message + `\n${msg.stack}`;
            message = message + ' ]';
            return message;
        })
    ),
    transports: [
        new transports.Console({
            handleExceptions: true
        }),
        transport
    ],
    exitOnError: false
})

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
}

const WinstonLogCreator = logLevel => {
    return ({ namespace, level, label, log }) => {
        const { message, ...extra } = log
        logger.error({ message, ...extra })
    }
}

exports.WinstonLogCreator = WinstonLogCreator ;
exports.logger = logger;
