
require.config({
  enforceDefine: true,
  paths: {
    jquery:          bowerPath('jquery/jquery'),
    underscore:      bowerPath('underscore-amd/underscore'),
    backbone:        bowerPath('backbone-amd/backbone'),
    //localstorage:    bowerPath('backbone.localStorage/backbone.localStorage'),
    vex:             bowerPath('vex/js/vex'),
    'vex.dialog':    bowerPath('vex/js/vex.dialog'),
    forms:           bowerPath('backbone-forms/distribution.amd/backbone-forms'),
    jade:            'jade',
    markdown:        bowerPath('../bower_components/marked/lib/marked')
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

function bowerPath(lib) {
  return '../bower_components/' + lib;
}
