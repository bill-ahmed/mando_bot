import { Response } from 'express';
import logger from './Logger';
import ResponseHandler from './ResponseHandler';
const config = require('../config.json');

export default class EventHandler {
    rh: ResponseHandler;
    constructor() {
        this.rh = new ResponseHandler();
    }

    public appMention(req: any, res: any): void{
        var rawMessage = req.body.event.text    as string;
        var sender = req.body.event.user        as string;
        var channel = req.body.event.channel    as string;

        // Only consider messages that mention the bot in the beginning, empty string if not so
        var message = this.getMessage(rawMessage);
        
        // Build response based on message
        var response = this.rh.getResponseByMessage(message, sender);
        this.rh.sendChatResponse(response, channel);

    }

    /**When setting up a slackbot, the request URL must be validated*/
    public validateRequestURL(req: any, res: any): void{
        res.send(req.body.challenge);
        logger.info("Verified request URL, token: " + req.body.token);
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

        if(rawMessage.startsWith(botMention)){
            return rawMessage.replace(botMention, "").trim().toLowerCase();
        } else {
            return '';
        }
    }
}