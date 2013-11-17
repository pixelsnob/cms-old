
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  name: String
});

module.exports = mongoose.model('User', UserSchema);

