const Fuse = require('fuse.js'),
      fuseOptions = require('../../config/fuse.config'),

      ApiError = require('../../utils/ApiError'),

      idsTable = ['godfatherId', 'godsonId'] 

async function getRelations (type, userId) {

    const ids = await db.family_relation.findAll({
        where: {
            [idsTable[type]]: userId
        }
    })

    const fetchedUsers = []

    for (const id of ids) fetchedUsers.push(
        (await db.user.findAll({ where: { id: id[idsTable[type === 1 ? 0 : 1]] } }))[0]
    )

    return fetchedUsers
}

module.exports = async (query, id) => {

    let user

    if (!query && !id) return ApiError('mdr')
    
    if (id) user = (await db.user.findAll({
        where: {
            id
        }
    }))[0]

    else {
        const allUsers = await db.user.findAll(),
              fuse = new Fuse(allUsers, fuseOptions)
        user = fuse.search(query)[0].item
    }

    return {
        user,
        godsons: await getRelations(0, user.id),
        godfathers: await getRelations(1, user.id)
    }

}