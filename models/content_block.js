
var mongoose   = require('mongoose'),
    types      = [ 'markdown' ];

var ContentBlockSchema = mongoose.Schema({
  region: { type: String, unique: true, required: true },
  content: { type: String, required: true },
  type: { type: String, required: true, enum: types }
});

module.exports = mongoose.model('ContentBlock', ContentBlockSchema);

