
var mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({
  description: String,
  category: String,
  path: String,
  maker: String,
  model_no: String,
  price: String,
  aka: String
});

module.exports = mongoose.model('Product', ProductSchema);

