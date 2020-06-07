import BackgroundJob from "../_cron/BackgroundJobClass";
import { JobLogger } from "../../utils/Logger";
import { GetListOfAllUsers } from "../../api/web_api/users/users.api";
import UserHelper from "../../models/User/User.helper";

export default class UserUpdater extends BackgroundJob {
    constructor() { super(); }

    public async perform(): Promise<void> {
        JobLogger.info("Starting update of all users.");
        let users = (await GetListOfAllUsers() as any[]).filter(user => { return !user.is_bot });

        for(const user of users) {

            let doc = {
                slack_id: user.id,
                first_name: user.profile.first_name || user.real_name,
                last_name: user.profile.last_name || ' ',
                gender: 'Unknown',
                email: user.profile.email || undefined
            }

            UserHelper.createOrUpdate(doc.slack_id, doc);
        }

        JobLogger.info("Finished updating list of all users.");
    }
}