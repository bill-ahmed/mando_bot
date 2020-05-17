import '../support/helpers';
import mongoose from 'mongoose';
import db_config from '../../src/config/db_config.json';
import User from '../../src/models/User/User.model';

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

    /** Clean up after each run */
    beforeEach((done) => {
        User.deleteMany({slack_id: test_user_slack_id}, (err) => { if (err) { throw err } });
        done();
    });

    it("should connect to mongo db with ports specified in config file", async (done) => {
        
        const db = mongoose.connection;
        expect(db.readyState).toEqual(1);
        
        done();
    });

    it("should be able to create a document in db", async (done) => {
        let user = new User({
            first_name: "test",
            last_name: "user",
            gender: "Male",
            date_of_birth: new Date(),
            email: "test@email.com",
            slack_id: test_user_slack_id
        });

        await user.save();
        done();
    });

    it("should not create a document with invalid field", async (done) => {
        let user = new User({
            first_name: "test",
            last_name: "user",
            gender: "Male",
            date_of_birth: new Date(),
            email: "INVALID_EMAIL",
            slack_id: test_user_slack_id
        });

        await(user.save((err) => { expect(err).not.toBeNull() }))   // Error given to callback function
        done();
    });

});