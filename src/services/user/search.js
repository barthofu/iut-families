const Fuse = require('fuse.js'),
      fuseOptions = require('../../config/fuse.config'),

      ApiError = require('../../utils/ApiError')

module.exports = async (query, id) => {

    if (!query && !id) return ApiError('mdr')

    if (id) return await db.user.findAll({
        where: {
            id
        }
    })

    else {

        const allUsers = await db.user.findAll(),
              fuse = new Fuse(allUsers, fuseOptions)

        const results = fuse.search(query).slice(0, 5).map(res => res.item)

        return results
    }

}