const verifyAPIKey = require('./middlewares/apiKey'),
      isAdmin = require('./middlewares/isAdmin')

      getUser = require('./api/getUser'),
      fetchFamily = require('./api/fetchFamily'),
      getApiKey = require('./api/getApiKey'),

      updateSecs = require('./api/updateSecs'),
      addUser = require('./api/addUser')

let router = require('express').Router()

router
    //.get('/', (req, res) => res.json({ res: 'Bienvenue sur l\api IUT Families !<br><br>Voici la liste des routes :' }))
    
    .get('/getUser', getUser)
    .get('/fetchFamily', fetchFamily)
    .get('/getApiKey', verifyAPIKey, isAdmin, getApiKey)
    
    .post('/addUser', verifyAPIKey, isAdmin, addUser)
    .post('/updateSecs', verifyAPIKey, updateSecs)
    

module.exports = router