# Slack Bot
This bot was created as a fun side-project & template to get quickly started with a slack bot. Checkout below for more info.

## Setup

### NodeJS and Dependencies
This application requires the LTS version of [NodeJS](https://nodejs.org/en/download/) as well as MongoDB v4.2.1 or higher (not guaranteed to work with lower versions!).

1. Install LTS version of NodeJS
2. In the root directory, run `npm install` to get all dependencies
3. Done!

### Configuration
#### General Config
The bot requires a `config.json` file in the root directory, with the following base format:

```json
{
    "slack": {
        "bot_oauth_token": "YOUR-BOT-OAUTH-TOKEN",
        "verification_token": "YOUR-SLACK-VERIFICATION-TOKEN",
        "bot_id": "BOT-ID",
        "bot_name": "BOT-NAME",
        "messaging": {
            "chatMessage": "https://slack.com/api/chat.postMessage"
        }
    }
}
```
The `bot_token` and `slack_token` fields are optional. If they are not provided, the following **environment variables** will be used in their place:
* `bot_oauth_token` -> `MANDO_BOT_TOKEN`
* `verification_token` -> `MANDO_SLACK_TOKEN`

#### DB Config
The file `config/db_config.json` helps initialize a connection to MongoDB. The following is the base format:

```json
{
    "mongo_db": {
        "url": "mongodb://localhost/",
        "port": "27017",
        "database": "mando_bot"
    }
}
```

For additional information on getting started, take a look at the [Bot Users](https://api.slack.com/bot-users) setup guide and the [Events API](https://api.slack.com/events-api).

## Running the app
### Development
Run `npm run dev` to start the server in development mode. 

### Production
1. Build JS Bundle: `npm run build`
2. Start server: `NODE_ENV=production node ./build/index.js`

## Additional Notes
All logging will be sent to the console when running in dev. When in production, all logs are combined into a single file and placed in `build/logs/logs_{current_date}.log`.