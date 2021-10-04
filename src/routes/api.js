let router = require('express').Router()

const getUser = require('../controllers/getUser'),
      getFamily = require('../controllers/getFamily')

router
    .get('/', (req, res) => res.json({ res: 'yo' }))
    .get('/getUser', getUser)
    .get('/getFamily', getFamily)

module.exports = router