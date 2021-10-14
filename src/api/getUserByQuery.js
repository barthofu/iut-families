const APIEndpoint = require('../utils/APIEndpoint'),

      { getUserByQuery } = require('../services/getUser'),
      { NotFoundError } = require('../utils/errors')

const params = {

    name: 'getUserByQuery',
    type: 'get',
    aliases: [],
    requiredArgs: [ 
        { name: 'query', type: 'string' },
    ],
    verifyAPIKey: false,
    fillotsOnly: false,
    admin: false
}

module.exports = class extends APIEndpoint {

    constructor () {
        super(params)
    }

    async run (req, res, next) {

        const user = await getUserByQuery(req.query.query)
            
        if (user.length === 0) return next(new NotFoundError('Utilisateur non trouvé'))
        
        return res.json(user)
    }

}