const APIEndpoint = require('../utils/APIEndpoint'),
      uuidAPIKey = require('uuid-apikey'),

      { getUserById } = require('../services/getUser'),
      { NotFoundError } = require('../utils/Errors')

const params = {

    name: 'getAPIKey',
    type: 'get',
    aliases: [],
    requiredArgs: [ 
        { name: 'id', type: 'int' },
    ],
    verifyAPIKey: true,
    admin: true
}

module.exports = class extends APIEndpoint {

    constructor () {
        super(params)
    }

    async run (req, res, next) {

        //get the related user
        const user = await getUserById(req.query.id, false)
        if (!user) return next(new NotFoundError('Utilisateur non trouvé'))
    
        //convert the uuid secret to a showable api key
        const apiKey = uuidAPIKey.toAPIKey(user.secret)
    
        //send the response
        res.json({ id: user.id, apiKey })
    }
}