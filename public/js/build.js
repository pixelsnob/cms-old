
/* Project build file for require */
({
  name: 'main',
  paths: {
    require_lib: '../bower_components/requirejs/require',
    jade: 'empty:',
    products: 'empty:'
  },
  include: [ 'require_lib' ],
  out: 'main-build.js',
  mainConfigFile: 'main.js'
})

