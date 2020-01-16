import request from 'request';
import { GetRandomInt } from './Helpers';
const config = require('../config.json');

const utils = config.utils;

/**List of happy emojis */
const HappyEmoji = utils.HappyEmoji                         as [string];

/**List of hello greetings the bot CAN RECIEVE. */
const HelloGreetings = utils.HelloGreetings                 as [string];

/**List of hello greetings the bot CAN RESPOND with. */
const HelloGreetingsResponse = utils.HelloGreetingsResponse as [string];

/**Some inspirational quotes... */
const InspirationalQuotes = utils.InspirationalQuotes       as [any];

export default class ResponseHandler {
    constructor() {
        // Empty   
    }

    /**Given a message, and the person that sent it, make an appropriate response
     * @param message The message that this bot is mentioned in
     * @sender The user that sent the message
     */
    public getResponseByMessage(message: string, sender: string): string{
        var response = "Hmm, I didn't catch that. To get an idea of what I can do, try `@Mando_bot help`";

        switch (message) {
            case "help":
                response = "Hey there! The following prompts are available: `help`, `quote`, and `random`.";
                break;

            case "quote":
                var randQuote = InspirationalQuotes[GetRandomInt(0, InspirationalQuotes.length - 1)];
                response = `_${randQuote.quote} — ${randQuote.author}, ${randQuote.source}_`;
            case "random":
                response = "`random` is WIP :)";
                break;

            default:

                // For stuff like "hello" and others, there are many possible variants
                if(HelloGreetings.includes(message)){
                    var randGreeting = HelloGreetingsResponse[ GetRandomInt(0, HelloGreetingsResponse.length - 1) ]
                    var randHappyEmoji = HappyEmoji[ GetRandomInt(0, HappyEmoji.length - 1) ]

                    response = `${randGreeting} <@${sender}> ${randHappyEmoji}`;
                }
        }

        return response;
    }

    /**Send a message to given channel
     * @param response The message to send
     * @param channel The channel to write this message to
     */
    public sendChatResponse(response: string, channel: string): void{
        var endpoint = config.slack.messaging.chatMessage;
        var headers = {
                'Authorization': "Bearer " + config.slack.bot_token,
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
            if (error) {console.error(error)}
        });
    }
}