
var mongoose          = require('mongoose'),
  ContentBlockModel   = require('./content_block.js'),
  Schema              = mongoose.Schema;

var PageSchema = Schema({
  path: { type: String, unique: true },
  title: String,
  keywords: String,
  description: String,
  //content: [ { type: Schema.Types.ObjectId, ref: 'ContentBlock' } ]
  content_blocks: [ ContentBlockModel.schema ]
});

module.exports = mongoose.model('Page', PageSchema);

