const { ForbiddenError } = require("../utils/errors")

module.exports = async (req, res, next) => {

    if (!req.user.admin) return next(new ForbiddenError())
    else next()

}