const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { routes } = require('./src/routes')
const cors = require('cors')

const PORT = 3000

const DB_URL =
  'mongodb+srv://Ainaz:SynqbL89sha4qEnJ@cluster0.d4wicuy.mongodb.net/?retryWrites=true&w=majority'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
routes.forEach((item) => {
  app.use(`/api/v1/${item}`, require(`./src/routes/${item}`))
})

// объявим наши роуты
async function startApp() {
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`)
  })
}

startApp()
