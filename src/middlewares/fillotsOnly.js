const { ForbiddenError } = require("../utils/Errors")

module.exports = async (req, res, next) => {

    const targetId = req.query?.id || req.body?.id

    if (targetId && !req.user.admin) {
        
        const result = await db.family_relation.findOne({
            where: {
                parrainId: req.user.id,
                fillotId: targetId
            }
        })

        if (!result) return next(new ForbiddenError('Cet utilisateur n\'est pas ton fillot / ta fillotte'))
        
    }

    req.targetId = targetId || req.user.id

    next()


}