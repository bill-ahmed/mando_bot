import '../support/helpers';
import Channel from '../../src/models/Channel/Channel.model';

describe('Channel Mode', () => {
    const test_channel_id = "1234567";

    /** Clean up after each run */
    beforeEach( async (done) => {
        await Channel.deleteMany({ channel_id: test_channel_id }).exec();
        done();
    })

    it('should be able to create a Channel in db', async (done) => {
        let channel = new Channel({
            channel_id: test_channel_id,
            name: "test channel",
            is_private: false,
        });
        await channel.save();   // Should not throw exception
        done();
    })

    it('should not be able to create a Channel with missing field', async (done) => {
        let channel = new Channel({
            name: "test channel",   // Missing channel_id
            is_private: true
        });

        await(channel.save(err => {expect(err).not.toBeNull(); done();}));
        done();
    })

    it('should not create a channel with a invalid field', async (done) => {
        let channel = new Channel({
            channel_id: test_channel_id,
            name: "test channel",
            is_private: 300,        // This should be boolean
        });

        await(channel.save(err => {expect(err).not.toBeNull(); done();}));
    })
})