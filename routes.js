
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
              //console.log(page.content);
              return res.render('cms_page', page);  
            },
            json: function() {
              return res.json(page);
            }
          });
        } else {
          return next();
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
          passport.authenticate('local', function(err, user, info) {
            console.log(user);
            if (err) {
              return next(err);
            }
            if (!user) {
              return res.send(401);
            }
            res.json(user);
            // save here
          })(req, res, next);
        } else {
          return next();
        }
      });
    },
    loginForm: function(req, res, next) {
      res.render('login_form');
    },
    login: function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        console.log(user);
        if (err) {
          return next(err);
        }
        if (!user) {
          //req.session.messages =  [info.message];
          return res.redirect('/login');
        }
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }
          return res.redirect('/');
        });
      })(req, res, next);
    }
  };
};

