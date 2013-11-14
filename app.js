
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
  PageModel       = require('./models/page.js'),
  jade_browser    = require('jade-browser'),
  marked          = require('marked');

app.configure(function() {
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  app.set('view cache', false);
  app.locals.pretty = true;
  app.locals.marked = marked;
  app.use(express.urlencoded()); 
  app.use(express.json());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'hotdog' }));
  app.use(express.csrf());
  app.use(function(req, res, next){
    app.settings.csrf = req.csrfToken();
    next();
  });
  // Expose compiled templates to frontend
  app.use(jade_browser(
    '/js/jade.js',
    [ 'product*', 'cms_page*' ],
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
  // Default search input value
  app.locals.search = req.body.search || '';
  next();
});

// Load up data -- this is a bad idea!
app.use(function(req, res, next) {
  // Get product categories for nav
  ProductModel.getCategories(function(err, categories) {
    if (err) {
      next(err);
    }
    app.locals.nav = categories;
    app.locals.paths = categories.map(function(obj) { return obj.path; });
    next();
  });
});

app.use(function(req, res, next) {
  ProductModel.find({}, function(err, products) {
    if (err) {
      next(err);
    }
    app.locals.all_products = products;
    next();
  });
});

// Routes
app.get('/', routes.home);
app.get('/products', routes.products);
app.get('/products/:path', routes.productsByPath);

app.post('/search', routes.search);
app.post('/products', routes.saveProduct);
app.put('/products/:id', routes.updateProduct);

// CMS dynamic routes
app.use(function(req, res, next) {
  var path = req.path.replace(/\/$/, '');
  PageModel.findOne({ path: path }, function(err, page) {
    if (err) {
      next(err);
    }
    if (page) {
      res.render('cms_page', page.content);  
    } else {
      next();
    }
  });
});

// Error page
app.use(function(err, req, res, next){
  console.log(err.stack);
  res.format({
    html: function() {
      res.render('error', { error: err.message });
    },
    json: function() {
      res.json({ shit: true });
    }
  });
});

app.listen(3001);
console.log('Listening on port 3001');

//PageModel.create({ path: '/caca/4', title: 'caca', content: { test: "heading\n--------\ntesting some __sexy__ ass markdown shizz" }}, function(err) { console.log(err); });


