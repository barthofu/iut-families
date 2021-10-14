const { ForbiddenError } = require("../utils/Errors")

module.exports = async (req, res, next) => {

    const targetId = req.query?.id || req.body?.id

    if (targetId && !req.user.admin) {
        
        const result = await db.family_relation.findOne({
            where: {
                godfatherId: req.user.id,
                godsonId: targetId
            }
        })

        if (!result) return next(new ForbiddenError('Cet utilisateur n\'est pas ton fillot / ta fillotte'))
        
    }

    next()


}