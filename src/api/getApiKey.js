const uuidAPIKey = require('uuid-apikey'),

      { getUserById } = require('../services/getUser')

module.exports = async (req, res, next) => {

    //get the related user
    const user = await getUserById(req.query.id, false)
    if (!user) next(new NotFoundError('Utilisateur non trouvé'))

    //convert the uuid secret to a showable api key
    const apiKey = uuidAPIKey.toAPIKey(user.secret)

    //send the response
    res.json({ id: user.id, apiKey })
}