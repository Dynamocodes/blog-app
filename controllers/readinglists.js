const router = require('express').Router()
const {User, Blog, ReadingLists} = require('../models')
const {tokenExtractor} = require('../utils/middleware')

router.post('/', async (req, res) => {
  const { userId, blogId } = req.body

  // make sure user and blog exist
  const user = await User.findByPk(userId)
  const blog = await Blog.findByPk(blogId)
  
  if (!user || !blog) {
    return res.status(400).json({ error: 'invalid user or blog id' })
  }
  
  // add to reading list
  const readingListItem = await ReadingLists.create({ userId, blogId })

  res.status(201).json(readingListItem)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const readingListItem = await ReadingLists.findByPk(req.params.id)

  if (!readingListItem) {
    return res.status(404).json({ error: 'Reading list item not found' })
  }

  // Check if the logged-in user is the owner of the reading list item
  if (readingListItem.userId !== req.decodedToken.id) {
    return res.status(403).json({ error: 'Access denied. You are not the owner of this reading list item.' })
  }

  const { read } = req.body;

  // Update the 'read' status and save changes
  readingListItem.isRead = read;
  await readingListItem.save();

  res.json(readingListItem)
});

module.exports = router