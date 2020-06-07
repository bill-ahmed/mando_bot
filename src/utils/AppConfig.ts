const config = require('../config/config.json');

export default class AppConfig {

    /*** App tokens & secrets ***/
    public static VERIFICATION_TOKEN = config.slack.verification_token || process.env.MANDO_SLACK_TOKEN;
    public static BOT_OAUTH_TOKEN = config.slack.bot_oauth_token || process.env.MANDO_BOT_TOKEN;

    /*** API Endpoints ***/
    public static endpoints = {
        /** Send a chat message to a channel. 
         * @type POST
        */
        CHAT_MESSAGE: config.slack.webAPI.messaging.chatMessage as string,

        /** Get list of all channels that this bot has access to. 
         * @type GET
        */
        ALL_ACCESSIBLE_CHANNELS: config.slack.webAPI.conversations.user_accessible_channels as string,

        /** Get list of all users that exist in the workspace
         * @type GET
         */
        ALL_USERS_LIST: config.slack.webAPI.users.users_list,

        views: {
            /** To publish a view
             * @type POST
             * @requires user_id
             * @requires view
             */
            publish:  config.slack.webAPI.views.publish.url
        }
    };

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