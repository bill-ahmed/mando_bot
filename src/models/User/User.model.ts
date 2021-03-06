import mongoose from 'mongoose';
import { prop, plugin, buildSchema, arrayProp, Ref } from '@typegoose/typegoose';
import uniqueValidator from 'mongoose-unique-validator';
import UserValidations from './User.validation';
import { ChannelKlass } from '../Channel/Channel.model';

/** Declare Types **/

/** The possible genders a User can have. */
type Gender = "Male" | "Female" | "Other" | "Unknown";


@plugin(uniqueValidator)
class UserClass {
    @prop({ required: true })
    first_name!: string;

    @prop()
    middle_names?: string;

    @prop({ required: true })
    last_name!: string;

    @prop({ required: true, enum: ['Male', 'Female', 'Other', 'Unknown'] })
    gender!: Gender;

    @prop({ unique: true, uniqueCaseInsensitive: true }) // 'unique' is NOT a validator! https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator
    email?: string;

    @prop({ required: true, unique: true, uniqueCaseInsensitive: true })
    slack_id!: string;

    @arrayProp({ ref: "Channel", default: [] })
    //@ts-ignore TODO: figure out why typescript is complaining here :(
    channels!: Ref<ChannelKlass>[]


    /*** DEFINE VIRTUALS ***/

    /** Get a user's full name. E.g. "John Smith", "Bob Murray" */
    public get fullName(): string {
        return `${this.first_name} ${this.last_name}`;
    }
}

const UserSchema = buildSchema(UserClass); 

/** Validations */
UserSchema.path('email').validate(UserValidations.validate_email);
UserSchema.path('slack_id').validate(UserValidations.validate_slack_id);

/** A document representing a User. */
const User = mongoose.model('User', UserSchema);
export const UserKlass = UserClass;
export default User;