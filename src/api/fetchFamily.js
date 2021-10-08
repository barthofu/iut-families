const fetchFamily = require('../services/fetchFamily'),
      { getUserById } = require('../services/getUser'),

      { NotFoundError } = require('../utils/errors')


module.exports = async (req, res, next) => {

    //get the related user
    const user = await getUserById(req.query.id)
    if (!user) return next(new NotFoundError('Utilisateur non trouvé')) 

    //fetch the entire family
    const family = await fetchFamily(user)

    //render the result
    return res.json(family)

}