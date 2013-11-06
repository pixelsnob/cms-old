
var ProductModel = require('./models/product.js'),
  jade           = require('jade'),
  _              = require('underscore');

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
    // Update
    updateProduct: function(req, res, next) {
      if (typeof req.body == 'object' && req.body._id) {
        var query = { _id: req.body._id },
          product = _.omit(req.body, '_id');
        ProductModel.update(query, product, function(err) {
          if (err) {
            next(err);
          } else {
            res.format({
              json: function() {
                res.json({ ok: 1 });
              },
              html: function() {
                res.send('ok');
              }
            });
          }
        });
      }
    },
    saveProduct: function(req, res, next) {
      //console.log(req.body);
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
    },
  };
};
