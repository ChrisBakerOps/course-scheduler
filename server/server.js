require('dotenv').config()
const express = require('express')
const cors = require('cors')
const coursesRouter = require('./routes/courses')
const completionsRouter = require('./routes/completions')

const app = express()

app.use(cors({ origin: process.env.CLIENT_ORIGIN }))
app.use(express.json())

app.use('/api', coursesRouter)
app.use('/api', completionsRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})