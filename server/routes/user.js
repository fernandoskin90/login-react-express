const express = require('express');
const bcrypt = require('bcryptjs');

const routerUser = express.Router();
const User = require('../mongo/models/User');
const { generateToken } = require('../utils/session');
const { validateUserByToken } = require('../config/auth');

routerUser.post('/register', async (req, res) => {
  try {
    const { name, email, userName, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({
        data: null,
        message: 'Email registered'
      });
    } else {
      const newUser = new User({
        name,
        email,
        password,
        userName
      });
      // Hash password
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          await newUser.save();
          res.status(200).json({
            data: {
              name: newUser.name,
              token: generateToken(newUser)
            },
            message: ''
          });
        })
      );
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      message: 'Error registering user'
    });
  }
});

// Handle login
routerUser.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.json({
      data: null,
      message: "Email user doesn't exist"
    })
  } else {
    // Match password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return err;
      if (isMatch) {
        res.json({
          data: {
            email: user.email,
            name: user.name,
            token: generateToken(user)
          },
          message: '',
        });
      } else {
        res.json({
          data: null,
          message: 'Invalid password'
        });
      }
    });
  }

});

routerUser.post('/authByToken', validateUserByToken,  (req, res) => {
  res.json({
    data: {
      userValid: true
    },
    message: ''
  })
})

module.exports = routerUser;
