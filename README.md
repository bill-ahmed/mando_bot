# Slack Bot
This Slack bot was created as a fun side-project :)

## Setup

### NodeJS and Dependencies
This application requires the LTS version of [NodeJS](https://nodejs.org/en/download/).

1. Install LTS version of NodeJS
2. In the root directory, run `npm install` to get all dependencies
3. Done!

### Configuration
The bot requires a `config.json` file in the root directory, with the following base format:

```json
{
    "slack": {
        "bot_token": "YOUR-BOT-TOKEN",
        "slack_token": "YOUR-SLACK-TOKEN",
        "bot_id": "BOT-ID",
        "bot_name": "BOT-NAME",
        "messaging": {
            "chatMessage": "https://slack.com/api/chat.postMessage"
        }
    }
}
```
The `bot_token` and `slack_token` fields are optional. If they are not provided, the following **environment variables** will be used in their place:
* `bot_token` -> `MANDO_BOT_TOKEN`
* `slack_token` -> `MANDO_SLACK_TOKEN`

For additional information on getting started, take a look at the [Bot Users](https://api.slack.com/bot-users) setup guide and the [Events API](https://api.slack.com/events-api).

## Running the app
In the project repo, use `npm run dev` to start the server in development mode. 
Additional scripts:
* Build JS Bundle: `npm run build`
* Production: `NODE_ENV=production node ./build/index.js`

## Additional Notes
All logging will be sent to the console when running in dev. When in production, all logs are combined into a single file and placed in `build/logs`.