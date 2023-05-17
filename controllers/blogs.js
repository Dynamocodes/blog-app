const router = require('express').Router()

const { Blog, User } = require('../models')
const {tokenExtractor} = require('../utils/middleware')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name','username']
    }
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({...req.body, userId: user.id, date: new Date()})
  res.json(blog)
})

router.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)

  if (!blog) {
    return res.status(404).end();
  }

  // Check if the logged-in user is the creator of the blog
  if (blog.userId !== req.decodedToken.id) {
    return res.status(403).json({ error: 'Access denied. You are not the creator of this blog.' });
  }

  await blog.destroy();
  res.status(204).end();
});



router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)

  if (!blog) {
    throw new Error('Blog not found')
  }

  blog.likes = req.body.likes
  await blog.save()

  res.json(blog)
})

module.exports = router