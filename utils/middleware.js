// utils/middleware.js

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
  
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Invalid request data' })
    }
  
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Duplicate data' })
    }
  
    return res.status(500).json({ error: 'Internal server error' })
  }
  
  module.exports = {
    errorHandler
  }