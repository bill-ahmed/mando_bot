import Channel from "./Channel.model";

export default class ChannelHelper {
    constructor() { /** Empty */ }

    /** If channel with given id doesn't exist, then a channel
     * with provided args will be created
     * @param id The id of the channel. NOT THE OBJECT ID
     * @param args The argument to pass consutrctor of Channel model
    */
    static async createOrUpdate(id: string, args: any): Promise<void> {
        let channel;
        let exists = await Channel.exists({channel_id: id})
        if(!exists) {
            channel = new Channel(args);
        } else {
            // If channel already exists, simply update all of its attributes 
            channel = await Channel.findOne({channel_id: id}).exec();
            channel?.overwrite(args);
        }

        try {
            if(channel) { await channel.save(); }
        } catch (error) {
            console.log(error);
        }
    }
}
