const { HOST, USER, PASSWORD, DB, dialect, pool } = require('../config/db.config')

const Sequelize = require('sequelize'),
      sequelize = new Sequelize(DB, USER, PASSWORD, {
          host: HOST,
          dialect,
          operatorsAliases: false,
          pool,
      })

      const fs = require('fs'),
      DataTypes = require('sequelize').DataTypes,

      models = {}

function initModels (sequelize) {

    const tables = fs.readdirSync('./src/models').filter(fileName => !fileName.startsWith('_')).map(fileName => fileName.split('.')[0])
    
    //import models
    for (const table of tables) 
        models[table] = require(`../models/${table}.js`)(sequelize, DataTypes)
    
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

module.exports = Object.assign(
    {
        Sequelize,
        sequelize,
    },
    initModels(sequelize)
)


