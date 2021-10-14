const APIEndpoint = require('../utils/APIEndpoint'),

      { getUserById } = require('../services/getUser'),
      { NotFoundError } = require('../utils/errors')

const params = {

    name: 'getUserById',
    type: 'get',
    aliases: [],
    args: [ 
        { name: 'id', type: 'int' },
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

        const user = await getUserById(req.query.id)
            
        if (!user) return next(new NotFoundError('Utilisateur non trouvé'))
        
        return res.json(user)
    }

}