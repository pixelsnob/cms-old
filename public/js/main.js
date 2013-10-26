
require.config({
  enforceDefine: true,
  paths: {
    jquery:         '../bower_components/jquery/jquery',
    underscore:     '../bower_components/underscore/underscore',
    backbone:       '../bower_components/backbone/backbone'
    //localstorage:   '../bower_components/backbone.localStorage/backbone.localStorage'
  },
  shim: {
    jquery: { exports: '$' },
    underscore: { exports: '_' },
    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    }
    //localstorage: { deps: [ 'backbone' ] }
  }
});

define([ 'backbone', 'routers/router', 'views/app' ],
function(Backbone, Router, AppView) {
  $(function() {
    new Router;
    new AppView;
    Backbone.history.start({
      pushState: true,
      hashChange: false,
      silent: true
    });
  });
});

require.onError = function(err) {
  console.log('require.onError: ' + err);
};

