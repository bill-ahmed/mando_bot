import mongoose from 'mongoose';

/** Definition of a user; feel free to add/remove any fields. */
const User = new mongoose.Schema({
    name: String,
    gender: String,
    age: Number,
    email: String,
    slack_id: String
});

/** A document representing a User. */
export default mongoose.model('User', User);