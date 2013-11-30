
require.config({
  enforceDefine: true,
  paths: {
    jquery:       '../bower_components/jquery/jquery',
    underscore:   '../bower_components/underscore-amd/underscore',
    backbone:     '../bower_components/backbone-amd/backbone',
    vex:          '../bower_components/vex/js/vex',
    'vex.dialog': '../bower_components/vex/js/vex.dialog',
    forms:        '../bower_components/backbone-forms/distribution.amd/backbone-forms',
    jade:         'jade',
    markdown:     '../bower_components/marked/lib/marked'
  },
  shim: {
    jade:           { exports: 'jade' },
    'vex.dialog':   { deps: [ 'vex' ], exports: 'vex' },
    'forms':        { deps: [ 'backbone' ] }
  }
});

define([
  'backbone',
  'routers/router',
  'views/app',
  'modules/csrf'
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

if (window.app_data.env != 'production') {
  require.onError = function(err) {
    console.log(err.stack);
  };
}

