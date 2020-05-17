import CRONJob from "../CRONJobClass";
import { CRONLogger } from "../../utils/Logger";
import { GetAllChannels } from "../../api/web_api/conversations/conversations.api";

export default class ChannelUpdater extends CRONJob {
    constructor() { super(); }

    public static async perform(): Promise<void> {
        CRONLogger.info("Starting refresh of list of channels.");

        let channel_data = await GetAllChannels();
        CRONLogger.info(`Found ${channel_data.length} channel(s).`);

        channel_data.forEach(channel => {
            
        });
    }
}