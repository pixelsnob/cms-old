
var jade        = require('jade'),
  PageModel     = require('./models/page'),
  passport      = require('passport'),
  _             = require('underscore');

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
      });
    },
    
    saveCmsPage: function(req, res, next) {
      if (!req.isAuthenticated()) {
        res.status(403);
        return next(new Error('You must be logged in to do that...'));
      }
      var id = req.body._id;
      // findOneAndUpdate() does not trigger validation on subdocuments, so
      // doing it this way...
      PageModel.findOne(id, function(err, page) {
        if (err) {
          return next(err);
        }
        if (page) {
          _.extend(page, req.body);
          page.save(function(err, _page) {
            if (err) {
              res.status(500);
              return next(err);
            }
            res.json(_page);
          });
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

