
var mongoose          = require('mongoose'),
  ContentBlockModel   = require('./content_block.js'),
  Schema              = mongoose.Schema;

var PageSchema = Schema({
  path: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  keywords: { type: String, required: true },
  description: { type: String, required: true },
  content_blocks: [{ type: Schema.Types.ObjectId, ref: 'ContentBlock' }]
  //content_blocks: { type: [ ContentBlockModel.schema ], required: true }
});

module.exports = mongoose.model('Page', PageSchema);

