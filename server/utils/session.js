const jwt = require('jsonwebtoken')
const { jwtConfig } = require('../config/keys')

function validateTokenExpiration(token) {
  try {
    const { exp } = jwt.verify(token, jwtConfig.secret)
    const expired = Date.now() >= exp * 1000
    return {
      message: expired ? 'Expired token' : '',
      expired
    }
  } catch (e) {
    return {
      message: 'Invalid token',
      expired: false
    }
  }
}

const generateToken = ({ email, password }) => 
  jwt.sign(
      { email, password },
      jwtConfig.secret,
      { expiresIn: 3600 }
    );


module.exports = { generateToken, validateTokenExpiration }
