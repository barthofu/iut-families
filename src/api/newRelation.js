const APIEndpoint = require('../utils/APIEndpoint'),
      { DatabaseError } = require('../utils/errors')

const params = {

    name: 'newRelation',
    type: 'post',
    aliases: [],
    requiredArgs: [ 
        { name: 'godfatherId', type: 'int' },
        { name: 'godsonId', type: 'int' }
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
    
        //create the user in the db
        db.family_relation.create(req.body)
            .then(newFamilyRelation => {
                res.json({
                    success: true,
                    data: newFamilyRelation
                })
            })
            .catch(e => next(new DatabaseError(e)))
    }


}