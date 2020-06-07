import mongoose from 'mongoose';
import Logger from '../utils/Logger';
import * as config from '../config/db_config.json';

/** Initialize connection to database */
export default async function main(): Promise<void> {
    const url = config.mongo_db.url + config.mongo_db.database;
    const options = { useNewUrlParser: true, useUnifiedTopology: true };

    await mongoose.connect(url, options);

    const db = mongoose.connection;
    db.on('error', errorCallback);
    db.once('open', successCallback);
}

/** If connection to db is not possible due to error. */
function errorCallback(): void {
    console.error.bind(console, 'connection error');
    Logger.error('Error connecting to db!');
}

/** Once we are successfully connected to db */
function successCallback(): void {
    Logger.info('Connected to db!');
}

main();