const Fuse = require('fuse.js'),
      fuseOptions = require('../config/fuse.config')

module.exports = {

    getUserById: async (id, excludeSecret = true) => await db.user.getUserById(id, excludeSecret),

    getUserByQuery: async (query) => {

        const allUsers = await db.user.findAll({ attributes: { exclude: [ 'secret' ] } }),
        fuse = new Fuse(allUsers, fuseOptions)

        const results = fuse.search(query).map(res => res.item)

        return results.slice(0, 5)
    }

}