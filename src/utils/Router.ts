import EventHandler from "../handlers/events/app_mentions/AppMentionHandler.handler";
import ChannelHandler from "../handlers/events/channel/ChannelEvents.handler";
import logger from './Logger';
import { Response, Request } from 'express';
import AppHomeOpenedHandler from "../handlers/events/app_home_opened/AppHomeOpened.handler";

/**
 * Given a request, route it to the appropriate handler.
 * @param requestType The type of request (e.g. event, etc.)
 * @param req Request data (headers, body, etc.)
 * @param res Response handler object
 */
export default async function RouteRequest(requestType: string, req: Request, res: Response) : Promise<void>{
    switch (requestType) {
        case "app_mention":
            new EventHandler().handleEvent(req, res);
            break;
        
        case "channel_left":
            new ChannelHandler().handleEvent(req, res);
            break;
        
        case "app_home_opened":
            new AppHomeOpenedHandler().handleEvent(req, res);
            break;
    
        default:
            break;
    }
}