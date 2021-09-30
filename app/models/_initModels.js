const fs = require('fs'),
      DataTypes = require('sequelize').DataTypes,

      models = {}

module.exports = (sequelize) => {

    const tables = fs.readdirSync('./app/models').filter(fileName => !fileName.startsWith('_')).map(fileName => fileName.split('.')[0])
    
    //import models
    for (const table of tables) 
        models[table] = require(`./${table}.js`)(sequelize, DataTypes)
    
    //check for forgein key relations
    for (const table of tables) {

        //check for each attribute if it is a foreign key or not
        for (const { fieldName, references } of Object.values(models[table].rawAttributes)) {
            if (references) {
                //define the relation on sequelize
                models[table].belongsTo(models[references.model], { as: fieldName.split('Id')[0], foreignKey: fieldName })
                models[references.model].hasMany(models[table], { as: `${fieldName.split('Id')[0]}_${table}`, foreignKey: fieldName })
            }
        }
    }

    return models

}




// var DataTypes = require("sequelize").DataTypes
// var _city = require("./city")
// var _family = require("./family")
// var _family_relation = require("./family_relation")
// var _studies = require("./studies")
// var _studies_relation = require("./studies_relation")
// var _user = require("./user")
// var _user_picture = require("./user_picture")

// function initModels(sequelize) {
//   var city = _city(sequelize, DataTypes)
//   var family = _family(sequelize, DataTypes)
//   var family_relation = _family_relation(sequelize, DataTypes)
//   var studies = _studies(sequelize, DataTypes)
//   var studies_relation = _studies_relation(sequelize, DataTypes)
//   var user = _user(sequelize, DataTypes)
//   var user_picture = _user_picture(sequelize, DataTypes)

//   family_relation.belongsTo(user, { as: "godfather", foreignKey: "godfatherId"})
//   family_relation.belongsTo(user, { as: "godson", foreignKey: "godsonId"})
//   user.hasMany(family_relation, { as: "family_relations", foreignKey: "godfatherId"})
//   user.hasMany(family_relation, { as: "godson_family_relations", foreignKey: "godsonId"})

//   studies.belongsTo(city, { as: "city", foreignKey: "cityId"})
//   city.hasMany(studies, { as: "studies", foreignKey: "cityId"})
//   studies_relation.belongsTo(studies, { as: "study", foreignKey: "studiesId"})
//   studies.hasMany(studies_relation, { as: "studies_relations", foreignKey: "studiesId"})
//   family.belongsTo(user, { as: "godfather", foreignKey: "godfatherId"})
//   user.hasMany(family, { as: "families", foreignKey: "godfatherId"})
//   

//   studies_relation.belongsTo(user, { as: "user", foreignKey: "userId"})
//   user.hasMany(studies_relation, { as: "studies_relations", foreignKey: "userId"})
//   user_picture.belongsTo(user, { as: "user", foreignKey: "userId"})
//   user.hasMany(user_picture, { as: "user_pictures", foreignKey: "userId"})

//   return {
//     city,
//     family,
//     family_relation,
//     studies,
//     studies_relation,
//     user,
//     user_picture,
//   }
// }
// module.exports = initModels
// module.exports.initModels = initModels
// module.exports.default = initModels
