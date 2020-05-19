import request from 'request';
import logger from '../utils/Logger';
import EventMessageAnalyzer from '../MessageAnalyzers/EventMessageAnalyzer';
import * as Greetings from '../MessageResponses/AppMentions/Greetings';
import { GetRandomInt } from '../utils/Helpers';
import Logger from '../utils/Logger';
import AppConfig from '../utils/AppConfig';

const config = require('../config/config.json');
const bot_token = AppConfig.BOT_OAUTH_TOKEN;

/**List of happy emojis */
const HappyEmoji = Greetings.GreetingEmoji;

/**List of hello greetings the bot CAN RECIEVE. */
const HelloGreetings = Greetings.HelloGreetings;

/**List of hello greetings the bot CAN RESPOND with. */
const HelloGreetingsResponse = Greetings.HelloGreetingsResponses;

export default class ResponseHandler {
    constructor() {
        // Empty   
    }

    /**Given a message, and the person that sent it, make an appropriate response
     * @param message The message that this bot is mentioned in
     * @param sender The user that sent the message
     * @param type The type of this message, for example "event"
     */
    public getResponseByMessage(message: string, sender: string, type: string): string{
        var response = `Hmm, I didn't catch that. To get an idea of what I can do, try \`@${config.slack.bot_name} help\``;
        var ea = new EventMessageAnalyzer()
        

        switch (type) {
            case "event_callback":
                var messageType = ea.analyzeMessage(message);
                switch (messageType) {
                    case "help":
                        response = "Hey there! The following prompts are available: `help`.";
                        logger.debug("Sent help info.");
                        break;
                
                    case "greeting":
                        var randGreeting = HelloGreetingsResponse[ GetRandomInt(0, HelloGreetingsResponse.length - 1) ]
                        var randHappyEmoji = HappyEmoji[ GetRandomInt(0, HappyEmoji.length - 1) ]

                        response = `${randGreeting} <@${sender}>${randHappyEmoji}`;
                        logger.debug("Sent hello greeting");
                        break;

                    default:
                        break;
                }

            default:
                break;
        }
        return response;
    }

    /**Send a message to given channel
     * @param response The message to send
     * @param channel The channel to write this message to
     */
    public sendChatResponse(response: string, channel: string): Promise<any>{
        return new Promise((resolve, reject) => {

            var endpoint = AppConfig.endpoints.CHAT_MESSAGE;
            var headers = {
                    'Authorization': "Bearer " + bot_token,
                    'Content-Type': 'application/json',
            };

            var body = {
                text: response,
                channel: channel,
                link_names: true
            };

            request.post({
                url: endpoint, 
                method: "POST",
                json: true,
                body: body,
                headers: headers
            }, (error: any, resp: any, body: any) => {
                if (error) {
                    logger.error("Error sending a chat response.");
                    logger.error(error);
                    reject(error);
                } else {
                    resolve(resp);
                }
            });
        });
    }
}