
/** A class to handle validations for a User. 
 * These validations are done during the save() action.
 */
class UserValidations {

    /** Taken from https://emailregex.com/ */
    private static email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor() {  }

    public static validate_email(email: string): boolean {
        return this.email_regex.test(email);
    }

    public static validate_slack_id(id: string): boolean {
        return true;
    }
}

export default UserValidations;