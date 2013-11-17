
var jade    = require('jade'),
  PageModel = require('./models/page');
          //_ = require('underscore');

module.exports = function(app) {
  return {
    renderCmsPage: function(req, res, next) {
      var path = req.path.replace(/\/$/, '');
      PageModel.findOne({ path: path }, function(err, page) {
        if (err) {
          next(err);
        }
        if (page) {
          res.format({
            html: function() {
              //console.log(page.content);
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
    },
    login: function(req, res, next) {
      res.render('login_form'); 
    }
  };
};


