
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
  jade_browser    = require('jade-browser'),
  marked          = require('marked'),
  passport        = require('passport'),
  _               = require('underscore');

require('./auth');

app.configure('development', function() {
  app.use(express.static(__dirname + '/public'));
  //app.settings.force_js_optimize = true;
});

app.configure(function() {
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  app.set('view cache', false);
  app.locals.pretty = true;
  app.locals.markdown = marked;
  app.locals._ = _;
  // View helper
  app.locals.renderPageContent = function(name, content) {
    var res = _.findWhere(content, { name: name });
    if (res) {
      if (res.filter == 'markdown') {
        return '<div id="' + res.id + '">' + marked(res.content) + '</div>';
      }
    }
  };
  app.use(express.urlencoded()); 
  app.use(express.json());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'hotdog' }));
  app.use(passport.initialize());
  app.use(passport.session());
  //app.use(express.csrf());
  app.use(function(req, res, next){
    //app.settings.csrf = req.csrfToken();
    if (req.isAuthenticated()) {
      app.settings.user = _.omit(req.user, 'password');
    } else {
      delete app.settings.user;
    }
    next();
  });
  // Expose compiled templates to frontend
  app.use(jade_browser(
    '/js/jade.js',
    [ 'cms_page*' ],
    { root: app.get('views'), minify: false, debug: true }
  ));
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

// Routes
app.get('/', function(req, res, next) {
  res.send(JSON.stringify(req.user));
});
app.get('/login', routes.loginForm);
app.post('/login', routes.login);
app.get('/logout', routes.logout);

// CMS dynamic routes
app.get('*', routes.renderCmsPage);
app.put('*', routes.saveCmsPage);
app.post('*', routes.saveCmsPage);

app.get(
  '/private',
  auth,
  function(req, res, next) {
    //console.log(req.user.name);
    res.send('hello');
  }
);

// Error page
app.use(function(err, req, res, next){
  console.log(err.stack);
  res.format({
    html: function() {
      res.render('error', { error: err.message });
    },
    json: function() {
      res.json(err);
    }
  });
});

app.listen(3001);
console.log('Listening on port 3001');

function auth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
}

