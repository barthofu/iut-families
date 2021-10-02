const Sequelize = require('sequelize')
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('studies', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'city',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'studies',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "cityId",
        using: "BTREE",
        fields: [
          { name: "cityId" },
        ]
      },
    ]
  })
}
