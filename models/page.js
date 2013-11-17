
var mongoose          = require('mongoose'),
  content_block_model = require('./content_block.js');

var PageSchema = mongoose.Schema({
  path: { type: String, unique: true },
  title: String,
  keywords: String,
  description: String,
  content: [ content_block_model.schema ]
});

module.exports = mongoose.model('Page', PageSchema);

