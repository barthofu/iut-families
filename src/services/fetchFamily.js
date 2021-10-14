const idsTable = ['godfatherId', 'godsonId'] 

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

module.exports = async (user) => {

    return {
        user,
        godsons: await getRelations(0, user.id),
        godfathers: await getRelations(1, user.id)
    }

}