const APIEndpoint = require('../utils/APIEndpoint'),

      { DatabaseError } = require('../utils/errors'),
      uuidAPIKey = require('uuid-apikey')

const params = {

    name: 'addUser',
    type: 'post',
    aliases: [],
    requiredArgs: [ 
        { name: 'firstName', type: 'string' },
        { name: 'lastName', type: 'string' },
    ],
    verifyAPIKey: true,
    fillotsOnly: false,
    admin: true
}

module.exports = class extends APIEndpoint {

    constructor () {
        super(params)
    }

    async run (req, res, next) {

        //generate api key
        const secret = uuidAPIKey.create()
        req.body.secret = secret.uuid
    
        //create the user in the db
        db.user.create(req.body)
            .then(newUser => {
                res.json({
                    success: true,
                    userId: newUser.id,
                    apiKey: secret.apiKey
                })
            })
            .catch(e => next(new DatabaseError(e)))
    }
}