const APIEndpoint = require('../../utils/APIEndpoint'),

      { DatabaseError, NotFoundError } = require('../../utils/errors'),
      uuidAPIKey = require('uuid-apikey')

const params = {

    name: 'confirmRelation',
    type: 'post',
    aliases: [],
    args: [
        { name: 'id', type: 'string' }
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

        const relation = await db.family_relation.findOne({ where: { id: req.body.id, confirmed: 0 }})
        if (!relation) return next(new NotFoundError())
        
        const result = await relation.confirm()
        if (result instanceof Error) return next(new DatabaseError(e))

        res.json({ success: true, data: result })
    }
}