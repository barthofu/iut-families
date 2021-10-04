const searchUser = require('../services/user/search')

module.exports = async (req, res) => {

    const { query, id } = req.query

    const user = await searchUser(query, id)

    return res.json(user)

}