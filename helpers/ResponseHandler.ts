import request from 'request';
const config = require('../config.json');

export default class ResponseHandler {
    constructor() {
        // Empty   
    }

    public getResponseByMessage(message: string): string{
        var response = "Hmm, I didn't catch that. To get an idea of what I can do, try `@Mando_bot help`";

        switch (message) {
            case "help":
                response = "The following prompts are available: `help`, `quote`, and `random`.";
                break;

            default:
                break;
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
            channel: channel
        };

        request.post({
            url: endpoint, 
            method: "POST",
            json: true,
            body: body,
            headers: headers
        }, (error, resp, body) => {
            error ? console.error(error) : console.log(resp.body);
        });
    }
}