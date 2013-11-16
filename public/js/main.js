
require.config({
  enforceDefine: true,
  paths: {
    jquery:       '../bower_components/jquery/jquery',
    underscore:   '../bower_components/underscore-amd/underscore',
    backbone:     '../bower_components/backbone-amd/backbone',
    jade:         'jade',
    //lunr:         '../bower_components/lunr.js/lunr',
    vex:          '../bower_components/vex/js/vex',
    'vex.dialog': '../bower_components/vex/js/vex.dialog',
    forms:        '../bower_components/backbone-forms/distribution.amd/backbone-forms'
  },
  shim: {
    jade:         { exports: 'jade' },
    //lunr:         { exports: 'lunr' },
    'vex.dialog': { deps: [ 'vex' ], exports: 'vex' },
    'forms': { deps: [ 'backbone' ] }
  }
});

define([
  'backbone',
  'routers/router',
  'views/app',
  'modules/csrf'
  //'modules/view_mixin'
], function(Backbone, AppRouter, AppView) {
  $(function() {
    var app_view = new AppView;
    new AppRouter({ app_view: app_view });
    Backbone.history.start({
      pushState: true,
      hashChange: false,
      silent: false 
    });
  });
});

require.onError = function(err) {
  console.log(err.stack);
};

