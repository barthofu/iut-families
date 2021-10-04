const express = require('express'),
      bodyParser = require('body-parser'),

      modelsLoader = require('./src/loaders/models.loader')
      
const app = express()

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extend: true }))

global.db = modelsLoader
db.sequelize.sync()

const apiRoute = require('./src/routes/api')

app.use('/api', apiRoute)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Le serveur a démarré sur : http://localhost:${PORT}`)
})