import request from 'request';
import AppConfig from '../../../utils/AppConfig';
import Logger from '../../../utils/Logger';
import ResponseHandler from '../../../handlers/ResponseHandler';

const rh = new ResponseHandler();

/** Get list of all users in the workspace */
export async function GetListOfAllUsers(): Promise<any> {
    const endpoint = AppConfig.endpoints.ALL_USERS_LIST;
    let result = await rh.sendGET(endpoint);
    return result.body.members;
}