import { Response, Request } from 'express';
import logger from '../../utils/Logger';
import ResponseHandler from '../ResponseHandler';

export default abstract class EventHandler {
    rh: ResponseHandler;

    constructor() { this.rh = new ResponseHandler(); }

    abstract handleEvent(...args: any): any;

    /**When setting up a slackbot, the request URL must be validated*/
    public async validateRequestURL(req: Request, res: Response): Promise<any>{
        res.send(req.body.challenge);
        logger.info("Verified request URL, token: " + req.body.token);
    }
}