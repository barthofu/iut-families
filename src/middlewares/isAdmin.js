const { ForbiddenError } = require("../utils/errors")

module.exports = async (req, res, next) => {

    if (!req.admin) return next(new ForbiddenError())
    else next()

}