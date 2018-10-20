const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username    : String,
    googleId    : { type: String, default: null},
    facebookId  : { type: String, default: null},
    provider    : { type: String, default: 'Google'}
});

const User = mongoose.model('user', userSchema);

module.exports = User;