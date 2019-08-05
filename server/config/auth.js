const jwt = require('jsonwebtoken');
const User = require('../mongo/models/User');
const { jwtConfig } = require('../config/keys');
const { validateTokenExpiration } = require('../utils/session');

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
      return next();
    } else {
      return res.json({
        data: null,
        message: 'Unauthorized user'
      })
    }
}

async function validateUserByToken (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({
      data: null,
      message: 'Not auth header sent'
    })
  }

  const token = req.headers.authorization.split('Bearer ')[1]
  const { message, expired } = validateTokenExpiration(token)

  if (expired) {
    return res.status(200).json({
      data: null,
      message
    })
  }

  try {
    const { email } = jwt.verify(token, jwtConfig.secret)
    const user = await User.findOne({ email });
    if (user) {
      next()
    } else {
      return res.json({
      data: null,
      message: "User didn't find"
    })
    }
  } catch (e) {
    return res.json({
      data: null,
      message: "Invalid token"
    })
  }
}

module.exports = {
  ensureAuthenticated,
  validateUserByToken
};
