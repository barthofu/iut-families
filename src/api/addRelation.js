const APIEndpoint = require('../utils/APIEndpoint'),
      { DatabaseError, ForbiddenError, NotFoundError, BadRequestError } = require('../utils/errors')

const params = {

    name: 'addRelation',
    type: 'post',
    aliases: [],
    args: [ 
        { name: 'parrainId', type: 'int', optional: true },
        { name: 'fillotId', type: 'int' }
    ],
    verifyAPIKey: true,
    fillotsOnly: false,
    admin: false
}

module.exports = class extends APIEndpoint {

    constructor () {
        super(params)
    }

    async run (req, res, next) {

        if (!req.body.parrainId) req.body.parrainId = req.user.id

        //verifications
        if (
            (
                !req.user.admin && 
                req.body.parrainId !== req.user.id
            ) ||
            ( req.body.fillotId === req.user.id )
        ) return next(new ForbiddenError())

        //check if relation already exists
        const alreadyExists = await db.family_relation.alreadyExists(req.body.parrainId, req.body.fillotId)
        if (alreadyExists) return next(new BadRequestError('Cette relation existe déjà'))
        
    
        //create the relation in the db
        db.family_relation
            .create(req.body)
            .then(newFamilyRelation => {
                res.json({
                    success: true,
                    data: newFamilyRelation
                })
            })
            .catch(e =>{
                if (e.name === 'SequelizeForeignKeyConstraintError') next(new NotFoundError(`${e.fields[0] === 'fillotId' ? 'Fillot' : 'Parrain' } non trouvé`))
                else next(new DatabaseError(e))
            } )
    }


}