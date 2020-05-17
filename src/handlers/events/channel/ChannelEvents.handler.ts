import { Response, Request } from 'express';
import logger from '../../../utils/Logger';
import ResponseHandler from '../../ResponseHandler';

export default class ChannelEventHandler {
    rh: ResponseHandler;
    constructor() {
        this.rh = new ResponseHandler();
    }

    /** For when the bot is kicked out of a channel */
    public async handleChannelLeft(req: Request, res: Response): Promise<void> {
        logger.debug("Bot removed from channel...");
    }
}