import BackgroundJob from "../_cron/BackgroundJobClass";
import { JobLogger } from "../../utils/Logger";
import { GetAllChannels } from "../../api/web_api/conversations/conversations.api";
import ChannelHelper from "../../models/Channel/Channel.helper";

export default class ChannelUpdater extends BackgroundJob {
    constructor() { super(); }

    /** Update list of all available channels
     * @override
     */
    public async perform(): Promise<void> {
        JobLogger.info("Starting refresh of list of channels.");

        let channel_data = await GetAllChannels();
        JobLogger.info(`Found ${channel_data.length} channel(s).`);

        channel_data.forEach(async channel => {
            let doc = { 
                channel_id: channel.id, 
                name: channel.name_normalized, 
                is_private: channel.is_private,
                creator: channel.creator 
            };
            await ChannelHelper.createOrUpdate(doc.channel_id, doc);
        });

        JobLogger.info("Finished updating list of channels");
    }
}