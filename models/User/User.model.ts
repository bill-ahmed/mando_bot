import mongoose, { Model } from 'mongoose';
import { prop, getModelForClass, plugin, buildSchema } from '@typegoose/typegoose';
import uniqueValidator from 'mongoose-unique-validator';
import UserValidations from './User.validation';

/** Declare Types */
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

    @prop({ required: true })
    date_of_birth!: Date;

    @prop({ required: true, unique: true, uniqueCaseInsensitive: true }) // 'unique' is NOT a validator! https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator
    email!: string;

    @prop({ required: true, unique: true, uniqueCaseInsensitive: true })
    slack_id!: string;

    /** Virtuals */
    public get fullName(): string {
        return `${this.first_name} ${this.last_name}`;
    }
}

const UserSchema = buildSchema(UserClass); 

/** Validations */
UserSchema.path('email').validate(UserValidations.validate_email);
UserSchema.path('slack_id').validate(UserValidations.validate_slack_id);

/** A document representing a User. */
export default mongoose.model('User', UserSchema);