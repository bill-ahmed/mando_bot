import { Response, Request } from 'express';
import logger from '../../../utils/Logger';
import ResponseHandler from '../../ResponseHandler';
import EventHandler from '../Event.handler';
import APP_HOME_VIEW from '../../../views/app_home/index.view';
import AppConfig from '../../../utils/AppConfig';

export default class AppHomeOpenedHandler extends EventHandler {

    constructor() { super(); }

    async handleEvent(req: Request, res: any) {
        // Need to include the user that has viewed app_home as part of response
        let user = req.body.event.user
        let body = {
            user_id: user,
            view: APP_HOME_VIEW
        }
        await this.rh.sendPOST(AppConfig.endpoints.views.publish, { body: body });
        logger.debug(`Sent view to user ${user}`)
    }
}