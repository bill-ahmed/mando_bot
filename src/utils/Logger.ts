import winston, { createLogger, format, transports } from 'winston';
const colorizer = winston.format.colorize();

const env = process.env.NODE_ENV;
const logFile = `logs_${new Date().toISOString().replace(":", "_").replace(":", "_")}.log`

/** A logger for console or log file, based on environment */
export default winston.createLogger({
    level: env === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
        winston.format.printf(msg => colorizer.colorize(msg.level, `[${msg.timestamp}] ${msg.level.toUpperCase()}: ${msg.message}`))
    ),
	transports: env === 'production' ? [
		new winston.transports.File(
            {
                filename: `${__dirname}/../logs/${logFile}`, 
                level: 'info',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.simple(),
                    winston.format.printf(msg => `[${msg.timestamp}] ${msg.level.toUpperCase()}: ${msg.message}`)
                    ),
            }
        ),
	] : 
	[
		new winston.transports.Console()
    ],
    
});