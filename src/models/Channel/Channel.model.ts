import mongoose from 'mongoose';
import { prop, plugin, buildSchema, arrayProp, Ref } from '@typegoose/typegoose';
import uniqueValidator from 'mongoose-unique-validator';
import { UserKlass } from '../User/User.model';

@plugin(uniqueValidator)
class ChannelClass {

    // 'unique' is NOT a validator! https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator
    @prop({ required: true, unique: true, uniqueCaseInsensitive: true })
    channel_id!: string;

    @prop({ required: true, default: "" })
    name!: string;

    /** Keep track of whether this bot is included in the channel or not. */
    @prop({ required: false, default: true })
    includes_bot?: boolean;

    @prop({ required: true, default: false })
    is_private!: boolean

    @arrayProp({ ref: "User", default: [] })
    //@ts-ignore TODO: figure out why typescript is complaining here :(
    users!: Ref<UserKlass>[]

    /** ID of the user that created this channel. */
    @prop({ default: "" })
    creator?: string;
}

const ChannelSchema = buildSchema(ChannelClass); 

/** A document representing a Channel. */
const Channel =  mongoose.model('Channel', ChannelSchema);
export const ChannelKlass = ChannelClass;
export default Channel;