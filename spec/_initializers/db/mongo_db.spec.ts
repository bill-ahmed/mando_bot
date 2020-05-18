import '../../support/helpers';
import mongoose from 'mongoose';
import db_config from '../../../src/config/db_config.json';
import User from '../../../src/models/User/User.model';

/** Test mongo db connection */
describe('Mongoose client', () => {

    const test_user_slack_id = "1234567";

    /** Connect to mongodb */
    beforeAll((done) => {
        const url = db_config.mongo_db.url + db_config.mongo_db.database;
        const options = { useNewUrlParser: true, useUnifiedTopology: true };
    
        mongoose.connect(url, options);

        const db = mongoose.connection;

        db.on('error', () => { console.error.bind("Error connecting to MongoDB!") });
        db.once('open', () => { done(); });
    });

    it("should connect to mongo db with ports specified in config file", async (done) => {
        
        const db = mongoose.connection;
        expect(db.readyState).toEqual(1);
        
        done();
    });
});