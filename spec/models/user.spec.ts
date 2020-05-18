import '../support/helpers';
import User from '../../src/models/User/User.model';

describe('User model', () => {
    const test_user_slack_id = "1234567";

    /** Clean up after each run */
    beforeEach( async (done) => {
        await User.deleteMany({slack_id: test_user_slack_id}).exec();;
        done();
    })

    it("should be able to create a User in db", async (done) => {
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
    })

    it("should not create a User with invalid field", async (done) => {
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
    })
});