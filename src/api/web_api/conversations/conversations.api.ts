import request from 'request';
import AppConfig from '../../../utils/AppConfig';
import Logger from '../../../utils/Logger';

/** Gets list of channels that this bot has access to. They can 
 * be both public and private, but not personal messages.
 */
export async function GetAllChannels(): Promise<Conversation[]> {
    return new Promise((resolve, reject) => {
        const endpoint = AppConfig.endpoints.ALL_ACCESSIBLE_CHANNELS;
        const bot_token = AppConfig.BOT_OAUTH_TOKEN;
        const body = {
            token: bot_token,
            limit: 1000,
            types: "public_channel,private_channel"
        }
    
        request.get({
            url: endpoint,
            method: "GET",
            json: true,
            qs: body
        }, (error: any, resp: any, body: any) => {
            if(error) {
                Logger.error("Error getting list of all channels");
                Logger.error(error);
                reject(error);
            } else {
                resolve(body.channels);
            }
        });
    });
}


export interface Conversation {
    id: string,
    name: string,
    name_normalized: string,
    is_channel: boolean,
    is_group: boolean,
    is_im: boolean,
    is_private: boolean,
    creator: string,
    topic: {
        value: string,
        creator: string,
        last_set: string,
    },
    purpose: {
        value: string,
        creator: string,
        last_set: string,
    }
}