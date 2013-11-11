
var mongoose = require('mongoose');

var PageSchema = mongoose.Schema({
  path: { type: String, unique: true },
  title: String,
  keywords: String,
  description: String,
  content: []
});

module.exports = mongoose.model('Page', PageSchema);

