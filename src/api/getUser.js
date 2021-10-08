const { getUserById, getUserByQuery } = require('../services/getUser'),
      { BadRequestError, NotFoundError } = require('../utils/errors')

module.exports = async (req, res, next) => {

    const { query, id } = req.query
    let user

    if (id) user = await getUserById(id)
    else if (query) user = await getUserByQuery(query)
    else return next(new BadRequestError('Paramètres invalides (query ou id nécessaire)'))

    if (!user || (user.isArray() && user.length === 0)) return next(new NotFoundError('Utilisateur non trouvé'))
    
    return res.json(user)

}