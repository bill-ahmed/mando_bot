import { Response, Request } from 'express';
import logger from '../../../utils/Logger';
import ResponseHandler from '../../ResponseHandler';
import EventHandler from '../Event.handler';
const config = require('../../../config/config.json');

export default class AppMentionHandler extends EventHandler {
    constructor() { super(); }

    public async handleEvent(req: Request, res: any): Promise<any>{
        var rawMessage = req.body.event.text    as string;
        var sender = req.body.event.user        as string;
        var channel = req.body.event.channel    as string;
        var messageType = req.body.type         as string;

        // Only consider messages that mention the bot, empty string if not so
        var message = this.getMessage(rawMessage);

        // Build response based on message
        var response = this.rh.getResponseByMessage(message, sender, messageType);
        this.rh.sendChatResponse(response, channel)
        .then(resp => { });
    }

    /**Get the tag representing this bot's id in message mentions for a workspace. E.g. id "ABCDE" would yield "<@ABCDE>" 
     * @returns A string representing the bot's tag inside a mentioned text
    */
    private getBotTag(): string {
        return `<@${config["slack"]["bot_id"]}>`;
    }

    /**Get message text with bot tag removed
     * @returns The text with bot mention removed, or empty string if improper message
     */
    private getMessage(rawMessage: string): string {
        var botMention = this.getBotTag();
        
        return rawMessage.replace(botMention, "").trim()
    }
}