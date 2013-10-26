
/* Imports data from old LAPR site */

var scraper        = require('./lib/scraper'),
  mongoose         = require('mongoose'),
  db               = mongoose.connect('mongodb://localhost/lapr'),
  urls             = require('./urls'),
  num_urls         = Object.keys(urls).length,
  async            = require('async'),
  ProductModel     = require('../models/product'),
  base_url         = 'http://lapercussionrentals.com/';

if (!num_urls) {
  console.error('No urls to process');
  process.exit(1);
}

db.connection.on('error', function(e) {
  console.error('Mongo error: ' + e);
  process.exit(1);
});

async.waterfall([
  // Drop collection
  function(cb) {
    dropCollection(ProductModel, cb);
  },
  // Scrape old site's product tables and import
  function(cb) {
    var i = 0, products = [];
    for (var url in urls) {
      // Get rows from tables for each url
      scraper.getRowsFromTable(base_url + url, (function(_url) {
        return function(err, rows) {
          if (err) {
            cb(err);
            return;
          }
          i++;
          // Map values to fields and add to products array
          for (var r = 1; r < rows.length; r++) {
            var fields = urls[_url].fields, row = rows[r];
            products.push({
              description: row[fields.description],
              category:    urls[_url].name,
              path:        urls[_url].name.toLowerCase().replace(/\s/g, '_'),
              maker:       (typeof row[fields.maker] != 'undefined' ?
                           row[fields.maker] : ''),
              price:       (typeof row[fields.price] != 'undefined' ?
                           row[fields.price] : ''),
              aka:         ''
            });
            if (r == rows.length - 1 && i == num_urls) {
              cb(null, products);
            }
          }
        };
      })(url));
    }
  },
  // Save products
  function(products, cb) {
    ProductModel.create(products, function(err) {
      if (err) {
        cb(err);
        return;
      }
      console.log(products.length + ' products added');
      cb();
    });
  }
], function(err) {
  // Done
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Done');
  db.connection.close();
});

// Drops a mongo collection if it exists
function dropCollection(model, cb) {
  model.collection.drop(function(err) {
    if (err && err.errmsg != 'ns not found') {
      cb(err);
      return;
    }
    cb();
  });
}

