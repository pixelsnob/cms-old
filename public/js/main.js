
require.config({
  enforceDefine: true,
  paths: {
    jquery:     '../bower_components/jquery/jquery',
    underscore: '../bower_components/underscore-amd/underscore',
    backbone:   '../bower_components/backbone-amd/backbone',
    jade:       'jade',
    lunr:       '../bower_components/lunr.js/lunr',
    forms:      '../bower_components/backbone-forms/distribution.amd/backbone-forms'
  },
  shim: {
    jade: { exports: 'jade' },
    lunr: { exports: 'lunr' }
  }
});

define([
  'backbone',
  'routers/router',
  'views/app',
  'vent',
  'forms'
], function(Backbone, AppRouter, AppView, vent) {
  $(function() {
    var app_view = new AppView; 
    // Make sure everything is loaded before setting up the router
    vent.listenTo(vent, 'products:loaded', function() {
      new AppRouter({ app_view: app_view });
      Backbone.history.start({
        pushState: true,
        hashChange: false,
        silent: false 
      });
    });
  });
});

require.onError = function(err) {
  console.log('require.onError: ' + err);
};

