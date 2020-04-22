import mongoose from 'mongoose';
import logger from '../utils/Logger';
import * as config from '../config/db_config.json';

/** Initialize connection to database */
export default function main(): void {
    const url = config.mongo_db.url + config.mongo_db.database;
    const options = { useNewUrlParser: true };

    mongoose.connect(url, options);

    const db = mongoose.connection;
    db.on('error', errorCallback);
    db.once('open', successCallback);
}

/** If connection to db is not possible due to error. */
function errorCallback(): void {
    console.error.bind(console, 'connection error');
    logger.error('Error connecting to db!');
}

/** Once we are successfully connected to db */
function successCallback(): void {
    logger.info('Connected to db!');
}

main();