import CRONJob from "../CRONJobClass";
import { CRONLogger } from "../../utils/Logger";
import { GetAllChannels } from "../../api/web_api/conversations/conversations.api";
import ChannelHelper from "../../models/Channel/Channel.helper";

export default class ChannelUpdater extends CRONJob {
    constructor() { super(); }

    public static async perform(): Promise<void> {
        CRONLogger.info("Starting refresh of list of channels.");

        let channel_data = await GetAllChannels();
        CRONLogger.info(`Found ${channel_data.length} channel(s).`);

        channel_data.forEach(async channel => {
            let doc = { 
                channel_id: channel.id, 
                name: channel.name_normalized, 
                is_private: channel.is_private,
                creator: channel.creator 
            };
            await ChannelHelper.findOrCreate(doc.channel_id, doc);
        });

        CRONLogger.info("Finished updating list of channels");
    }
}