
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
  mongoose        = require('mongoose'),
  db              = mongoose.connect(DB_URI, DB_OPTS),
  PageModel       = require('./models/page.js'),
  jade_browser    = require('jade-browser'),
  marked          = require('marked');
  //jsdom           = require('jsdom');

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
    [ 'cms_page*' ],
    { root: app.get('views'), minify: false, debug: true }
  ));
});

app.configure('development', function() {
  app.use(express.static(__dirname + '/public'));
  //app.settings.force_js_optimize = true;
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

// Routes
app.get('/', routes.home);

// CMS dynamic routes
app.use(function(req, res, next) {
  var path = req.path.replace(/\/$/, '');
  PageModel.findOne({ path: path }, function(err, page) {
    if (err) {
      next(err);
    }
    if (page) {
      res.format({
        html: function() {
          res.render('cms_page', page);  
        },
        json: function() {
          res.json(page);
        }
      });
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

PageModel.create({
  path: '/test/11',
  title: 'caca <> "',
  keywords: 'blah',
  description: 'meh',
  content: { test: "hmm this is alright\n----\n\ntest" }
}, function(err) {
  console.log(err);
});


