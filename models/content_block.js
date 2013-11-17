
var mongoose = require('mongoose');

var ContentBlockSchema = mongoose.Schema({
  name: { type: String, unique: true },
  content: String,
  filter: String
}, {
  collection: 'content_blocks'
});

module.exports = mongoose.model('ContentBlock', ContentBlockSchema);

