import mongoose from 'mongoose';
import { prop, plugin, buildSchema } from '@typegoose/typegoose';
import uniqueValidator from 'mongoose-unique-validator';

@plugin(uniqueValidator)
class ChannelClass {

    // 'unique' is NOT a validator! https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator
    @prop({ required: true, unique: true, uniqueCaseInsensitive: true })
    id!: string;

    @prop({ required: true })
    name!: string;

    @prop()
    creator?: string;
}

const ChannelSchema = buildSchema(ChannelClass); 

/** Validations */


/** A document representing a Channel. */
export default mongoose.model('Channel', ChannelSchema);