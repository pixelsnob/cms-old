
var passport     = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  UserModel      = require('./models/user');
  
passport.use(new LocalStrategy(function(username, password, done) {
  UserModel.findOne({ username: username }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'Unknown user ' + username });
    }
    user.comparePassword(password, function(err, match) {
      if (err) {
        return done(err);
      }
      if (match) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  });
}));

passport.serializeUser(function(user, done) {
  console.log('?');
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  UserModel.findById(id, function(err, user) {
    console.log(user);
    done(err, user);
  });
});

