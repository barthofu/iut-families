const idsTable = ['parrainId', 'fillotId'] 

async function getRelations (type, userId) {

    const ids = await db.family_relation.findAll({
        where: {
            [idsTable[type]]: userId
        }
    })

    const fetchedUsers = []

    for (const id of ids) fetchedUsers.push(
        (await db.user.findAll({ where: { id: id[idsTable[type === 1 ? 0 : 1]], confirmed: 1 } }))[0]
    )

    return fetchedUsers
}

module.exports = async (user) => {

    return {
        user,
        fillots: await getRelations(0, user.id),
        parrains: await getRelations(1, user.id)
    }

}