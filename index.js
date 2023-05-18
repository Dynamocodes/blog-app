const express = require('express')
const app = express()
require('express-async-errors');
const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db'
)
const usersRouter = require('./controllers/users')
const authorsRouter = require('./controllers/authors')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const readingListsRouter = require('./controllers/readinglists')

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/readinglists', readingListsRouter)
app.use(require('./utils/middleware').errorHandler);

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()