import mongoose from 'mongoose';

class User {
    constructor(parameters?: any) {
        
    }
}

/** Definition of a user; feel free to add/remove any fields. */
const UserSchema = new mongoose.Schema({
    first_name:     { type: String, required: true },
    middle_names:   { type: Array },
    last_name:      { type: String, required: true },
    gender:         { type: String, required: true },
    birthday:       { type: Date, required: true },
    email:          { type: String, required: true },
    slack_id:       { type: String, required: true }
}).loadClass(User);     // Can define getters/setters, statics, virtuals, etc. https://mongoosejs.com/docs/guide.html#es6-classes

/** A document representing a User. */
export default mongoose.model('User', UserSchema);