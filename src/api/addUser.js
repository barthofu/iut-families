const { BadRequestError, DatabaseError } = require('../utils/errors'),
      uuidAPIKey = require('uuid-apikey')

module.exports = (req, res, next) => {

    if (!req.body.firstName || !req.body.lastName) return next(new BadRequestError())

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