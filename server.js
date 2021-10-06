const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      env = require('dotenv'),
      passport = require('passport'),

      modelsLoader = require('./src/loaders/models.loader')
      
const app = express(),
      session = require('express-session')

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extend: true }))
    .use(cors())
    .use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true}))
    .use(passport.initialize())
    .use(passport.session())


global.db = modelsLoader

require('./src/services/passport')(passport, db.user);

db.sequelize.sync()

const apiRoute = require('./src/routes/api')

app.use('/api', apiRoute)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Le serveur a démarré sur : http://localhost:${PORT}`)
})