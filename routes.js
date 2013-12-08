
var
  jade                  = require('jade'),
  Page                  = require('./models/page'),
  ContentBlock          = require('./models/content_block'),
  passport              = require('passport'),
  async                 = require('async'),
  _                     = require('underscore');

module.exports = function(app) {
  
  return {
    
    renderCmsPage: function(req, res, next) {
      var path = req.path.replace(/\/$/, '');
      Page.findOne({ path: path }).populate('content_blocks').exec(
      function(err, page) {
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
      var body = _.omit(req.body, [ '_id', 'content_blocks' ]);
      async.waterfall([
        function(callback) {
          if (!req.body._id) {
            return callback(new Error('_id is not defined'));
          }
          Page.findOne(req.body._id, function(err, page) {
            if (err) {
              return callback(err);
            }
            if (page) {
              _.extend(page, _.omit(req.body, 'content_blocks'));
              callback(null, page);
            } else {
              callback(new Error('Page not found'));
            }
          });
        },
        function(page, callback) {
          if (_.isArray(req.body.content_blocks)) {
            var iterator = function(val, key) { return val._id; };
            page.content_blocks = _.map(req.body.content_blocks, iterator);
            page.save(function(err) {
              if (err) {
                return callback(err);
              }
              callback(null, page);
            });
          } else {
            return next(new Error('content_blocks must be an array')); 
          }
        },
        function(page, callback) {
          var c = 0;
          req.body.content_blocks.forEach(function(content_block) {
            ContentBlock.findOneAndUpdate(
              content_block._id, 
              _.omit(content_block, '_id'),
              function(err, _content_block) {
                if (err) {
                  return callback(err);
                }
                if (++c == page.content_blocks.length) {
                  page.content_blocks = req.body.content_blocks;
                  callback(null, page);
                }
              }
            );
          });
        }
      ], function(err, page) {
        if (err) {
          res.status(500);
          return next(err);
        }
        res.json(page);
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

