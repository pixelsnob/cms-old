
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

ProductSchema.statics.getCategories = function(cb) {
  this.aggregate(
    { $group: { _id: '$path', category: { $first: '$category' } } }, 
    { $project: { _id: 0, category: 1, path: '$_id' } },
    { $sort: { category: 1 } },
    cb
  );
};

module.exports = mongoose.model('Product', ProductSchema);

