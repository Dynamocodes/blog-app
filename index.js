const express = require('express')
const app = express()

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db'
)
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/blogs', notesRouter)
app.use('/api/login', loginRouter)
//app.use(require('./utils/middleware').errorHandler);

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()