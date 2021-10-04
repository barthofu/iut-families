const getFamily = require('../services/family/fetch')

module.exports = async (req, res) => {

    const { query, id } = req.query

    const user = await getFamily(query, id)

    return res.json(user)

}