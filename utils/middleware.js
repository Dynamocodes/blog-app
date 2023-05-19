const jwt = require('jsonwebtoken');
const {SECRET} = require('./config')
const {User, Session} = require('../models')

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if ( error.name === 'SequelizeValidationError') {
    const errorMessages = error.errors.map((err) => err.message);
    return res.status(400).json({ error: errorMessages });
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ error: 'Duplicate data' });
  }

  return res.status(500).json({ error: 'Internal server error' });
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }

    // check the session in the database
    const session = await Session.findOne({ where: { token: authorization.substring(7) } })
    if (!session) {
      return res.status(401).json({ error: 'session invalid' })
    }

    // Check if the user is disabled
    const user = await User.findByPk(req.decodedToken.id)
    if (user && user.disabled) {
      return res.status(403).json({ error: 'This user account is disabled' })
    }

  }  else {
    return res.status(401).json({ error: 'token missing' })
  }

  next()
}

  module.exports = {
    errorHandler,
    tokenExtractor,
  }