const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
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

db.sequelize.sync()

const apiRoute = require('./src/routes')

app.use('/api', apiRoute)

app.use('*', (req, res, next) => {
    const error = new Error(`${req.ip} tried to access ${req.originalUrl}`)
    error.statusCode = 301
     
    next(error)
})

app.use((error, req, res, next) => {

    if (!error.statusCode) error.statusCode = 500

    if (error.statusCode === 301) return res.status(301).redirect('/not-found')
   
    return res
      .status(error.statusCode)
      .json({ error: error.toString().split(' ').slice(1).join(' ')})
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Le serveur a démarré sur : http://localhost:${PORT}`)
})