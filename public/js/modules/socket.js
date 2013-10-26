
define([ 'socketio' ], function(socketio) {
  var socket = socketio.connect(window.document.domain, {});
  socket.on('error', function() {
    console.log('socketio error');
  });
  return socket;
});
