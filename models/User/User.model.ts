import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import UserValidations from './User.validation';

class User {
    constructor(parameters?: any) {
        
    }
}

/** Definition of a user; feel free to add/remove any fields. */
const UserSchema = new mongoose.Schema({
    first_name:     { type: String, required: true },
    middle_names:   { type: Array },
    last_name:      { type: String, required: true },
    gender:         { type: String, required: true, enum: ['Male', 'Female', 'Other', 'Unknown'] },
    birthday:       { type: Date, required: true },
    email:          { type: String, required: true, unique: true, uniqueCaseInsensitive: true },     // 'unique' is NOT a validator! https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator
    slack_id:       { type: String, required: true, unique: true, uniqueCaseInsensitive: true }
}).loadClass(User).plugin(uniqueValidator);     // Can define getters/setters, statics, virtuals, etc. https://mongoosejs.com/docs/guide.html#es6-classes

/** A document representing a User. */
export default mongoose.model('User', UserSchema);