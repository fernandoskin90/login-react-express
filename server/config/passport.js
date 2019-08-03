const LocalStrategy = require('passport-local').Strategy;
// const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// User model
const User = require('../mongo/models/User');

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email'
      },
      async (email, password, done) => {
        // Match user
        const user = await User.findOne({ email });
        if (!user)
          return done(null, false, {
            message: 'el email no ha sido registrado'
          });

        // Match passwaor
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'contraseña incorrecta' });
          }
        });

        passport.serializeUser((user, done) => {
          done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
          User.findById(id, (err, user) => {
            done(err, user);
          });
        });
      }
    )
  );
};
