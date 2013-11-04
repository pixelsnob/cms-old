
var ProductModel = require('./models/product.js');

module.exports = function(app) {
  return {
    home: function(req, res, next) {
      res.render('index', { title: 'Home' });
    },
    products_by_path: function(req, res, next) {
      if (app.locals.paths.indexOf(req.params.path) == -1) {
        next();
        return;
      }
      ProductModel.find()
        .where('path').equals(req.params.path)
        .sort({ description: 1 })
        .exec(function(err, products) {
          if (err) {
            next(err);
          } else {
            res.format({
              html: function() {
                res.render('products', { filtered_products: products });
              },
              json: function() {
               res.json(products);
              }
            });
          }
        });
    },
    all_products: function(req, res, next) {
      ProductModel.find()
        .sort({ description: 1 })
        .exec(function(err, products) {
          if (err) {
            next(err);
          } else {
            res.format({
              html: function() {
                res.render('products', { filtered_products: products });
              },
              json: function() {
                res.json(products);
              }
            });
          }
        });
    },
    search: function(req, res, next) {
      var search = req.body.search || '';
      var ids = lunr_index.search(search).map(function(r) {
        return r.ref; 
      });
      ProductModel.find({ _id: { $in: ids }}, null, function(err, products) {
        if (err) {
          next(err);
        } else {
          res.render('products', { filtered_products: products });
        }
      });
    }
  };
};
