
var jade    = require('jade'),
  PageModel = require('./models/page'),
  passport  = require('passport');
          //_ = require('underscore');

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
              res.render('cms_page', { page: page });  
            },
            json: function() {
              res.json(page);
            }
          });
        } else {
          next();
        }
      });
    },
    
    saveCmsPage: function(req, res, next) {
      var path = req.path.replace(/\/$/, '');
      PageModel.findOne({ path: path }, function(err, page) {
        if (err) {
          return next(err);
        }
        if (page) {
            if (req.isAuthenticated()) {
              // save here
              res.json(req.user);
            } else {
              res.send(401);
            }
        } else {
          next();
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
          res.redirect('/');
        });
      })(req, res, next);
    },
    
    logout: function(req, res, next) {
      req.logout();
      res.redirect('/login');
    }
  };
};

