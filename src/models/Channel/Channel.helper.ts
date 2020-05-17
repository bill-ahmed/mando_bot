import Channel from "./Channel.model";

export default class ChannelHelper {
    constructor() { /** Empty */ }

    /** If channel with given id doesn't exist, then a channel
     * with provided args will be created
     * @param id The id of the channel. NOT THE OBJECT ID
     * @param args The argument to pass consutrctor of Channel model
    */
    static async findOrCreate(id: string, args: any): Promise<void> {
        let exists = await Channel.exists({channel_id: id})
        if(!exists) {
            let new_channel = new Channel(args);
            try {
                await new_channel.save();
            } catch (error) {
                console.log(error);
            }
        }
    }
}
