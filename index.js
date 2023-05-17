const express = require('express')
const app = express()

const sequelize = require('./models/postgres')

const Blog = require('./models/Blog')
Blog.sync()

app.use(express.json());

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  try{
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch(error){
    return res.status(400).json({ error })
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    await blog.destroy();
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Unable to delete the blog:', error);
    res.status(500).json({ error: 'Unable to delete the blog' });
  }
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
