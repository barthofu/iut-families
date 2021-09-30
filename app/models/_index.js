const { HOST, USER, PASSWORD, DB, dialect, pool } = require('../config/db')

const Sequelize = require('sequelize'),
      sequelize = new Sequelize(DB, USER, PASSWORD, {
          host: HOST,
          dialect,
          operatorsAliases: false,
          pool,
      })

module.exports = {

    Sequelize,
    sequelize
}
















