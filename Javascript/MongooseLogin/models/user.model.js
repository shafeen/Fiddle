var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// NOTE: for a real user, it is NOT okay to use a plaintext password
var userSchema = new Schema({
    email: String,
    password: String
});

module.exports = mongoose.model('User', userSchema, 'Users');
