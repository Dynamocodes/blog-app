const router = require('express').Router()

const { User, Blog, ReadingLists } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const { read } = req.query;
  let where = {};

  if (read !== undefined) {
    where.isRead = read === 'true';
  }

  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        as: 'readings',
        through: {
          model: ReadingLists,
          as: 'reading_lists', // match the alias in association
          attributes: ['isRead', 'id'],
          where,
        },
      },
    ],
  })

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  const userData = {
    ...user.toJSON(),
    readings: user.readings.map((reading) => {
      const { id, url, title, author, likes, year_written, reading_lists } = reading
      return {
        id,
        url,
        title,
        author,
        likes,
        year: year_written,
        readinglists: reading_lists ? [reading_lists] : [],
      }
    }),
  }

  res.json(userData)
})


router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
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
    user.updated_at = new Date()
    await user.save();

    res.json(user);
  } catch (error) {
    return res.status(400).json({ error: 'Invalid request data' });
  }
});

module.exports = router