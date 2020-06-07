import User from "./User.model";
import Logger from "../../utils/Logger";

export default class UserHelper {
    constructor() { /** Empty */ }

    static async createOrUpdate(id: string, args: any) {
        let user;
        let exists = await User.exists({slack_id: id})
        if(!exists) {
            user = new User(args);
        } else {
            user = await User.findOne({slack_id: id});
            user?.overwrite(args);
        }

        try {
            await user?.save()
        } catch (error) {
            Logger.error(error);
        }
    }
}