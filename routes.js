
var jade             = require('jade'),
  ContentBlockModel  = require('./models/content_block'),
  PageModel          = require('./models/page'),
  passport           = require('passport'),
  _                  = require('underscore');

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
              var query = { _id: { $in: page.content_blocks }};
              ContentBlockModel.find(query, function(err, content_blocks) {
                if (err) {
                  return next(err);
                }
                res.render('cms_page', {
                  page: page,
                  content_blocks: content_blocks
                });  
              });
            },
            json: function() {
              res.json(page);
            }
          });
        } else {
          next();
        }
      });//.populate('content_blocks');
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
      }).populate('content_blocks');
    },

    saveContentBlock: function(req, res, next) {
      if (!req.isAuthenticated()) {
        res.status(403);
        return next(new Error('You must be logged in to do that...'));
      }
      var id = req.body._id;
      // findOneAndUpdate() does not trigger validation on subdocuments, so
      // doing it this way...
      ContentBlockModel.findOne(id, function(err, page) {
        if (err) {
          return next(err);
        }
        if (content_block) {
          _.extend(content_block, req.body);
          content_block.save(function(err, _content_block) {
            if (err) {
              res.status(500);
              return next(err);
            }
            res.json(_content_block);
          });
        } else {
          next(new Error('Content block not found'));
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

