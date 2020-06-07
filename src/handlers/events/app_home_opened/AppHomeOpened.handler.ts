import { Response, Request } from 'express';
import logger from '../../../utils/Logger';
import ResponseHandler from '../../ResponseHandler';
import EventHandler from '../Event.handler';

export default class AppHomeOpenedHandler extends EventHandler {
    constructor() { super(); }

    async handleEvent(req: Request, res: any) {
        console.log("got app home opened event");
    }
}