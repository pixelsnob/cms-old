
var ProductModel = require('./models/product.js'),
  jade           = require('jade');

module.exports = function(app) {
  return {
    // Home page
    home: function(req, res, next) {
      res.render('index', { title: 'Home' });
    },
    // Show products for current path (category)
    productsByPath: function(req, res, next) {
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
    // Show all products
    products: function(req, res, next) {
      ProductModel
        .find()
        .sort('description')
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
    saveProduct: function(req, res, next) {
      res.json({ ok: true });
    },
    // Perform a product search
    search: function(req, res, next) {
      var search = req.body.search || '';
      var ids = lunr_index.search(search).map(function(r) {
        return r.ref; 
      });
      ProductModel
        .find()
        .where('_id').in(ids)
        .exec(function(err, products) {
          if (err) {
            next(err);
          } else {
            res.render('products', { filtered_products: products });
          }
        });
    }
  };
};
