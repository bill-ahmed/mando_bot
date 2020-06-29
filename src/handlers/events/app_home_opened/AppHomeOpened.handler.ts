import { Request } from 'express';
import logger from '../../../utils/Logger';
import EventHandler from '../Event.handler';
import HomeTab from '../../../views/app_home/index.view';
import AppConfig from '../../../utils/AppConfig';

export default class AppHomeOpenedHandler extends EventHandler {

    constructor() { super(); }

    async handleEvent(req: Request, res: any) {
        // Need to include the user that has viewed app_home as part of response
        let user = req.body.event.user
        let body = {
            user_id: user,
            view: HomeTab()
        }
        await this.rh.sendPOST(AppConfig.endpoints.views.publish, { body: body });
    }
}
