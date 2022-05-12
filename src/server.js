const express = require('express')
const cors = require('cors')

const app = express()

const todoRoutes = require('./routes')
app.use(express.json())

app.get('/health', (req, res) => {
  return res.json('up')
})
app.use(cors())
app.use(todoRoutes)

app.listen(3333, () => console.log(`Server running in 3333`))
