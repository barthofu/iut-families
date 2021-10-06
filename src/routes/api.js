
const getUser = require('../controllers/getUser'),
      getFamily = require('../controllers/getFamily'),
      passport = require('passport')

let router = require('express').Router()

router
    .get('/', (req, res) => res.json({ res: 'Bienvenue sur l\api IUT Families !<br><br>Voici la liste des routes :' }))
    .post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: ''
    }))
    .get('/getUser', getUser)
    .get('/getFamily', getFamily)

module.exports = router