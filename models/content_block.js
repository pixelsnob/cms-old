
var mongoose   = require('mongoose'),
    types      = [ 'markdown' ];

var ContentBlockSchema = mongoose.Schema({
  //name: { type: String, unique: true },
  content: { type: String, required: true },
  type: { type: String, required: true, enum: types }
});

module.exports = mongoose.model('ContentBlock', ContentBlockSchema);

