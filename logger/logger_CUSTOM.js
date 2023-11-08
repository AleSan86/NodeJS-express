import winston from 'winston'
import config from '../config/config.js'

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        debug: 'white'
    }
}

// Custom logger
const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,

    transports: [
        // Consola
        new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
            winston.format.colorize({ colors: customLevelsOptions.colors }),
            winston.format.simple()
        )}),
        // File
        new winston.transports.File({
        filename: './errors.log',
        level: 'warning',
        format: winston.format.simple()
        })
    ]
})

//Test logger Debug
const debugLogger = winston.createLogger({
    levels: customLevelsOptions.levels,

    transports: [
        // Consola
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )}),
        // File
        new winston.transports.File({ 
            filename: './debug.log', 
            level: 'debug',
            format: winston.format.simple()
        })
    ],
  });

// Logger para producción
const prodLogger = winston.createLogger({
    transports: [
        // Consola
        new winston.transports.Console({ level: 'http' }),
        // File
        new winston.transports.File({ filename: './errors.log', level: 'warn' })
    ]
})

export const addLogger = (req, res, next) => {
    // logger
    if (config.environment === 'production') {
        req.logger = prodLogger;
        req.logger.warn("Prueba de log level WARN en Producción");
        req.logger.http(`${req.method} en ${req.url} - en ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    }    
    else {
        req.logger = devLogger;
        req.logger.warning("Prueba log warn Ok (Develop)");
        req.logger.info(`${req.method} en ${req.url} - en ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
        //req.debugLogger = debugLogger;
        //req.debugLogger.debug(`${req.level}`)
    }

    next()
}