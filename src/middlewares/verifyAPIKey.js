const { BadRequestError } = require("../utils/Errors"),
      uuidAPIKey = require('uuid-apikey')

module.exports = async (req, res, next) => {

    const apiKey = req.body?.apiKey || req.query?.apiKey 

    if (!apiKey) return next(new BadRequestError('Clé API non fournie'))

    else if (!uuidAPIKey.isAPIKey(apiKey)) return next(new BadRequestError('Clé API invalide (mauvais format)'))

    else {

        const secretUUID = uuidAPIKey.toUUID(apiKey)

        const user = await db.user.findOne({
            where: { secret: secretUUID }
        })

        if (!user) return next(new BadRequestError('Clé API non reconnue'))

        else {

            req.user = {
                id: user.id,
                admin: user.admin === 0 ? false : true
            }
            req.authorized = true
            next()
        }
    }
}