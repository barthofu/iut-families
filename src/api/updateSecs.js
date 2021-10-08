const { getUserById } = require('../services/getUser'),
      { NotFoundError } = require('../utils/errors')

module.exports = async (req, res, next) => {

    const { id, increment } = req.body

    const user = await getUserById(id)
    
    if (!user) return next(new NotFoundError('Utilisateur non trouvé'))

    await user.updateSecs(increment)

    res.render({ success: true })



}