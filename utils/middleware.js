const jwt = require('jsonwebtoken');
const {SECRET} = require('./config')

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'SequelizeValidationError') {
    const errorMessages = error.errors.map((err) => err.message);
    return res.status(400).json({ error: errorMessages });
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ error: 'Duplicate data' });
  }

  return res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;

  
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  console.log("authorization", authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
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