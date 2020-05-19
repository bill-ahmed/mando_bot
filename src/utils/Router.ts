import EventHandler from "../handlers/events/app_mentions/Events.handler";
import ChannelHandler from "../handlers/events/channel/ChannelEvents.handler";
import logger from './Logger';
import { Response, Request } from 'express';

const ev = new EventHandler();
const ch = new ChannelHandler();

/**
 * Given a request, route it to the appropriate handler.
 * @param requestType The type of request (e.g. event, etc.)
 * @param req Request data (headers, body, etc.)
 * @param res Response handler object
 */
export default async function RouteRequest(requestType: string, req: Request, res: Response) : Promise<void>{
    switch (requestType) {
        case "app_mention":
            ev.appMention(req, res);
            break;
        
        case "channel_left":
            ch.handleChannelLeft(req, res);
            break;
    
        default:
            break;
    }
}