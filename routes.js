
var jade = require('jade'),
    _    = require('underscore');

module.exports = function(app) {
  return {
    // Home page
    home: function(req, res, next) {
      res.render('index', { title: 'Home' });
    }
  };
};
