import winston, { createLogger, format, transports } from 'winston';
const colorizer = winston.format.colorize();

const env = process.env.NODE_ENV;

/** A logger for console or log file, based on environment */
export default winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
        winston.format.printf(msg => colorizer.colorize(msg.level, `[${msg.timestamp}] ${msg.level.toUpperCase()}: ${msg.message}`))
    ),
	transports: env === 'production' ? [
		new winston.transports.File({filename: `../logs/logs_${new Date().toISOString().replace(":", "_").replace(":", "_")}.log`})
	] : 
	[
		new winston.transports.Console()
    ],
    
});