const mongoose = require ('mongoose');
var findOrCreate = require('mongoose-findorcreate');



let userSchema = new mongoose.Schema({
    id : String,
    user : String
});
userSchema.plugin(findOrCreate);
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;