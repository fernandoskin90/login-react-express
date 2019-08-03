const express = require('express');
const bcryot = require('bcryptjs');
const passport = require('passport');

const routerUser = express.Router();
const User = require('../mongo/models/User');

// login
routerUser.get('/login', (req, res) => res.send('login'));

// Register
routerUser.get('/register', (req, res) => res.send('Register'));

routerUser.post('/register', async (req, res) => {
  try {
    const { name, email, userName, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({
        msg: 'el email ya se encuentra registrado'
      });
    } else {
      const newUser = new User({
        name,
        email,
        password,
        userName
      });
      // Hash password
      bcryot.genSalt(10, (err, salt) =>
        bcryot.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          await newUser.save();
          // TODO: hacer redirección
          res.status(200).json({
            msg: 'Usuario registrado correctamente',
            name: newUser.name
          });
        })
      );
    }
  } catch (error) {
    res.status(500).json({
      msg: 'error regisstrando al usuario'
    });
  }
});

// Handle login
routerUser.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/data',
    failureRedirect: '/user/login'
  })(req, res, next);
});

routerUser.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/user/login');
});

module.exports = routerUser;
