const Sequelize = require('sequelize')
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('studies_relation', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    studiesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'studies',
        key: 'id'
      }
    },
    startYear: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    endYear: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'studies_relation',
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
        name: "userId",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "studiesId",
        using: "BTREE",
        fields: [
          { name: "studiesId" },
        ]
      },
    ]
  })
}
