
require.config({
  enforceDefine: true,
  paths: {
    jquery:         '../bower_components/jquery/jquery',
    underscore:     '../bower_components/underscore/underscore',
    backbone:       '../bower_components/backbone/backbone',
    jade:           'jade',
    lunr:           '../bower_components/lunr.js/lunr'
  },
  shim: {
    jquery: { exports: '$' },
    underscore: { exports: '_' },
    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    },
    jade: { exports: 'jade' },
    lunr: { exports: 'lunr' }
  }
});

define([
  'backbone',
  'routers/router',
  'views/app'
], function(Backbone, AppRouter, AppView) {
  $(function() {
    new AppRouter;
    Backbone.history.start({
      pushState: true,
      hashChange: false,
      silent: false
    });
  });
});

require.onError = function(err) {
  console.log('require.onError: ' + err);
};

