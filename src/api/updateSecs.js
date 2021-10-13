const  APIEndpoint = require('../utils/APIEndpoint'),

      { getUserById } = require('../services/getUser'),
      { NotFoundError, DatabaseError } = require('../utils/errors')

const params = {

    name: 'updateSecs',
    type: 'post',
    aliases: [],
    requiredArgs: [
        { name: 'id', type: 'int' },
        { name: 'increment', type: 'int' }
    ],
    verifyAPIKey: true,
    admin: false
}

module.exports = class extends APIEndpoint {

    constructor () {
        super(params)
    }

    async run (req, res, next) {

        const { id, increment } = req.body
    
        const user = await getUserById(id)
        
        if (!user) return next(new NotFoundError('Utilisateur non trouvé'))
    
        const result = await user.updateSecs(increment)
        if (result instanceof Error) return next(new DatabaseError(result))
    
        res.json({ success: true, data: result })
    }
}