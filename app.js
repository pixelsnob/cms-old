
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
  routes          = require('./routes')(app),
  lunr            = require('lunr'),
  mongoose        = require('mongoose'),
  db              = mongoose.connect(DB_URI, DB_OPTS),
  ProductModel    = require('./models/product.js'),
  jade_browser    = require('jade-browser');

app.configure(function() {
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  app.set('view cache', true);
  app.locals.pretty = true;
  app.use(express.urlencoded()); 
  app.use(express.json());
  // Expose compiled templates to frontend
  app.use(jade_browser(
    '/js/jade.js',
    [ 'product*' ],
    { root: app.get('views'), minify: false, debug: true }
  ));
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

db.connection.once('connected', function() {
  console.log('mongo connected');
  // Get product categories for nav
  ProductModel.aggregate(
    { $group: { _id: '$path', category: { $first: '$category' } } }, 
    { $project: { _id: 0, category: 1, path: '$_id' } },
    { $sort: { category: 1 } },
    function(err, categories) {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      app.locals.nav = categories;
      app.locals.paths = categories.map(function(n) { return n.path; });
    }
  );
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

app.use(function(req, res, next) {
  app.locals.search = req.body.search || '';
  next();
});

// Routes
app.get('/', routes.home);
app.get('/products', routes.products);
app.get('/products/:path', routes.productsByPath);
app.post('/search', routes.search);
app.post('/products', routes.saveProduct);

// Error page
app.use(function(err, req, res, next){
  console.log(err.stack);
  res.render('error', { error: err.message });
});

app.listen(3001);
console.log('Listening on port 3001');

