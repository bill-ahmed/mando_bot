import { Response, Request } from 'express';
import Logger from '../../../utils/Logger';
import ResponseHandler from '../../ResponseHandler';
import Channel from '../../../models/Channel/Channel.model';
import EventHandler from '../Event.handler';

export default class ChannelEventHandler extends EventHandler {
    constructor() { super(); }

    /** For when the bot is kicked out of a channel */
    public async handleEvent(req: Request, res: Response): Promise<void> {
        let channel_removed = req.body.event.channel;  // ID of the channel this bot was removed from
        let channel;

        // If the channel exists, continue with the removal
        // the channel may not exists if bot is added & 
        // removed before the CRON job makes its round
        if(channel = await Channel.findOne({ channel_id: channel_removed }).exec()) {
            channel.remove();
            Logger.info(`Bot removed from channel ${channel}`);
        }
    }
}