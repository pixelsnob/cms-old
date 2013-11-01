
'use strict';

var
  DB_OPTS = {
    server: {
      auto_reconnect: true,
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 10000
      }
    }
  },
  DB_URI          = 'mongodb://localhost/lapr',
  express         = require('express'),
  app             = express(),
  lunr            = require('lunr'),
  mongoose        = require('mongoose'),
  db              = mongoose.connect(DB_URI, DB_OPTS),
  ProductModel    = require('./models/product.js'),
  jade_browser    = require('jade-browser'),
  jsdom           = require('jsdom');

app.configure(function() {
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  app.set('view cache', true);
  app.locals.pretty = true;
  app.use(express.urlencoded()); 
  app.use(express.json());
  // Expose compiled templates to frontend
  app.use(jade_browser('/js/jade.js', [ 'products_list.jade' ],
    { root: app.get('views'), minify: true }));
});

app.configure('development', function() {
  app.use(express.static(__dirname + '/public'));
  //app.settings.force_js_optimize = true;
});

// Create lunr index
var lunr_index = lunr(function () {
  this.ref('_id');
  this.field('description');
  this.field('aka');
  this.field('category');
  this.field('maker');
});

// Load data
db.connection.once('connected', function() {
  console.log('mongo connected');
  ProductModel.aggregate(
    { $group: { _id: '$path', category: { $first: '$category' }}}, 
    { $project: { _id: 0, category: 1, path: '$_id' }},
    function(err, categories) {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      app.locals.nav = categories;
      app.locals.paths = categories.map(function(n) { return n.path; });
    }
  );
  ProductModel.find({}, null, function(err, products) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    products.forEach(function(product) {
      lunr_index.add(product);
    });
    app.locals.products = products;
  });
});

db.connection.on('error', function(err) {
  console.error('mongo error: ' + err);
});

db.connection.on('disconnected', function(err) {
  console.log('mongo disconnected');
});

db.connection.on('reconnected', function() {
  console.log('mongo reconnected');
});

// Routes
app.use(function(req, res, next) {
  app.locals.search = req.body.search || '';
  next();
});

app.get('/', function(req, res) {
  res.render('index', { title: 'Home' });
});

app.get('/products/all', function(req, res) {
  ProductModel.find({}, function(err, products) {
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
});

app.get('/products/:path', function(req, res, next) {
  if (app.locals.paths.indexOf(req.params.path) == -1) {
    next();
    return;
  }
  ProductModel.find({ path: req.params.path }, function(err, products) {
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
});

app.get('/vexflow-test', function(req, res, next) {
  res.render('vexflow-test');
});

app.post('/search', function(req, res, next) {
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
});

app.use(function(err, req, res, next){
  console.log(err.stack);
  res.render('error', { error: err.message });
});

app.listen(3001);
console.log('Listening on port 3001');

