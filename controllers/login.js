const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../utils/config')
const User = require('../models/user')
const Session = require('../models/session')  // Import the Session model

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  if (!user) {
    return response.status(401).json({
      error: 'invalid username'
    })
  }

  if (user.disabled) {
    return response.status(403).json({
      error: 'This user account is disabled'
    })
  }

  const passwordCorrect = body.password === 'secret'

  if (!passwordCorrect) {
    return response.status(401).json({
      error: 'invalid password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }
  const token = jwt.sign(userForToken, SECRET, { expiresIn: '1h' })

  // Save the session in the database
  await Session.create({
    userId: user.id,
    token: token
  })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router
