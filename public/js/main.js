
require.config({
  enforceDefine: true,
  paths: {
    jquery:       '../bower_components/jquery/jquery',
    underscore:   '../bower_components/underscore-amd/underscore',
    backbone:     '../bower_components/backbone-amd/backbone',
    jade:         'jade',
    lunr:         '../bower_components/lunr.js/lunr',
    forms:        '../bower_components/backbone-forms/distribution.amd/backbone-forms',
    vex:          '../bower_components/vex/js/vex',
    'vex.dialog': '../bower_components/vex/js/vex.dialog'
  },
  shim: {
    jade:         { exports: 'jade' },
    lunr:         { exports: 'lunr' },
    'vex.dialog': { deps: [ 'vex' ], exports: 'vex' }
  }
});

define([
  'backbone',
  'routers/router',
  'views/app',
  'modules/vent',
  'forms',
  'modules/csrf'
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

