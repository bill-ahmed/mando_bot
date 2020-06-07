import ConnectToMongoose from '../initializers/mongo';
import { mongoose } from '@typegoose/typegoose';
import Logger from '../utils/Logger';
import ChannelUpdater from '../jobs/channel_updater/UpdateChannels';
import UserUpdater from '../jobs/user_updater/UpdateUsers';

/** Seed the database with initial data 
 * @summary This will drop all collections in your database
 * and seed with new data. 
 * 
 * WARNING: MAKE ABSOLUTELY SURE THAT YOU WANT TO RUN THIS.
*/
async function seedDB() {
    await ConnectToMongoose();
    Logger.warn("Dropping database...");

    mongoose.connection.db.dropDatabase(async (err, result) => {
        if(err) { Logger.error("Unable to drop db."); Logger.error(err); }
        else { await _populateDB(); }
    });
}

async function _populateDB() {
    await new ChannelUpdater().perform();
    await new UserUpdater().perform();
    Logger.info("Finished populating db. You may now exit the script.")
}

seedDB();