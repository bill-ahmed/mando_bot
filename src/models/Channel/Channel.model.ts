import mongoose from 'mongoose';
import { prop, plugin, buildSchema } from '@typegoose/typegoose';
import uniqueValidator from 'mongoose-unique-validator';

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

    /** ID of the user that created this channel. */
    @prop()
    creator?: string;
}

const ChannelSchema = buildSchema(ChannelClass); 

/** A document representing a Channel. */
const Channel =  mongoose.model('Channel', ChannelSchema);
export default Channel;