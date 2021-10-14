const APIEndpoint = require('../utils/APIEndpoint'),

      fetchFamily = require('../services/fetchFamily'),
      { getUserById } = require('../services/getUser'),

      { NotFoundError } = require('../utils/errors')

const params = {

    name: 'fetchFamily',
    type: 'get',
    aliases: [],
    requiredArgs: [ 
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

        //get the related user
        const user = await getUserById(req.query.id)
        if (!user) return next(new NotFoundError('Utilisateur non trouvé')) 
    
        //fetch the entire family
        const family = await fetchFamily(user)
    
        //render the result
        return res.json(family)
    }
}