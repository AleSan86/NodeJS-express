import winston from 'winston';

const logger = winston.createLogger({
    transports: [
        //Consola
        new winston.transports.Console({ level: "http"}),
        //File
        new winston.transports.File({ filename: './errors.log', level: 'warn' })
    ]
})

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.warn(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`)
    next();
}