const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', async (req, res) => {
  const { username } = req.params;
  const { newUsername } = req.body;

  try {
    // Check if the new username is already taken
    const existingUser = await User.findOne({ where: { username: newUsername } });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Find the user by the current username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the username and save changes
    user.username = newUsername;
    await user.save();

    res.json(user);
  } catch (error) {
    return res.status(400).json({ error: 'Invalid request data' });
  }
});

module.exports = router