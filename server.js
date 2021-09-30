const express = require('express'),
      bodyParser = require('body-parser'),

      initModels = require('./app/models/_initModels')
      
const app = express()

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extend: true }))

const dbConfig = require('./app/models/_index'),
      db = Object.assign(
          dbConfig,
          initModels(dbConfig.sequelize)
      )
db.sequelize.sync()

app.get('/', (req, res) => {
    res.json({ message: 'Yeah !' })
})


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Le serveur a démarré sur : http://localhost:${PORT}`)
})