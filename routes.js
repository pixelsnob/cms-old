
var
  jade                  = require('jade'),
  PageModel             = require('./models/page'),
  ContentBlockModel     = require('./models/page'),
  passport              = require('passport'),
  _                     = require('underscore');

module.exports = function(app) {
  
  return {
    
    renderCmsPage: function(req, res, next) {
      var path = req.path.replace(/\/$/, '');
      PageModel.findOne({ path: path }, function(err, page) {
        if (err) {
          return next(err);
        }
        if (page) {
          res.format({
            html: function() {
              //console.log(page);
              res.render('cms_page', { page: page });  
            },
            json: function() {
              res.json(page);
            }
          });
        } else {
          next();
        }
      }).populate('content_blocks');
    },
    
    saveCmsPage: function(req, res, next) {
      if (!req.isAuthenticated()) {
        res.status(403);
        return next(new Error('You must be logged in to do that...'));
      }
      var body = _.omit(req.body, [ '_id', 'content_blocks' ]);
      PageModel.findOneAndUpdate(req.body._id, body, function(err, page) {
        if (err) {
          return next(err);
        }
        if (page) {
          res.json(req.body);
        } else {
          next(new Error('Page not found'));
        }
      });
    },
    
    loginForm: function(req, res, next) {
      if (req.isAuthenticated()) {
        return res.redirect('/');
      }
      res.render('login_form');
    },
    
    login: function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          req.session.messages =  [ info.message ];
          return res.redirect('/login');
        }
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }
          res.redirect('/test/11');
        });
      })(req, res, next);
    },
    
    logout: function(req, res, next) {
      req.logout();
      res.redirect('/login');
    },

    getUser: function(req, res, next) {
      if (req.isAuthenticated()) {
        res.format({
          json: function() {
            res.json(req.user);
          }
        });
      }
    }
  };
};

