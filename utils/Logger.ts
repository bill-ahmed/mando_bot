import winston from 'winston';

/** A logger for console or log file, based on environment */
export const logger = winston.createLogger({
	transports: process.env.NODE_ENV === 'production' ? [
		new winston.transports.File({filename: `../logs/logs_${new Date().toISOString().replace(":", "_").replace(":", "_")}`})
	] : 
	[
		new winston.transports.Console()
	]
});