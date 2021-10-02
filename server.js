const express = require('express'),
      bodyParser = require('body-parser'),

      modelsLoader = require('./src/loaders/models.loader')
      
const app = express()

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extend: true }))

const db = modelsLoader
db.sequelize.sync()

app.get('/', (req, res) => {
    res.json({ message: 'Yeah !' })
})


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Le serveur a démarré sur : http://localhost:${PORT}`)
})