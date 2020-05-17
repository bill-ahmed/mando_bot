const config = require('../config/config.json');

export default class AppConfig {

    /** App tokens & secrets */
    public static VERIFICATION_TOKEN = config.slack.verification_token || process.env.MANDO_SLACK_TOKEN;;
    public static BOT_OAUTH_TOKEN = config.slack.bot_oauth_token || process.env.MANDO_BOT_TOKEN;;

    /** Singleton */
    private static _instance: AppConfig;

    private constructor() { }

    public static getInstance(): AppConfig {
        if(!AppConfig._instance) {
            AppConfig._instance = new AppConfig();
        }

        return AppConfig._instance;
    }
}