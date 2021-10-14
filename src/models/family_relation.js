const Sequelize = require('sequelize')
module.exports = function(sequelize, DataTypes) {

	const Model = sequelize.define('family_relation', {
		id: {
		autoIncrement: true,
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true
		},
		parrainId: {
		type: DataTypes.INTEGER,
		allowNull: true,
		references: {
			model: 'user',
			key: 'id'
		}
		},
		fillotId: {
		type: DataTypes.INTEGER,
		allowNull: true,
		references: {
			model: 'user',
			key: 'id'
		}
		},
		type: {
		type: DataTypes.TINYINT,
		allowNull: true,
		defaultValue: 0
		},
		date: {
		type: DataTypes.DATEONLY,
		allowNull: true
		},
		confirmed: {
		type: DataTypes.TINYINT,
		allowNull: true,
		defaultValue: 0
		},
	}, {
		sequelize,
		tableName: 'family_relation',
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
			name: "parrainId",
			using: "BTREE",
			fields: [
			{ name: "parrainId" },
			]
		},
		{
			name: "fillotId",
			using: "BTREE",
			fields: [
			{ name: "fillotId" },
			]
		},
		]
	})

  	// =================== METHODS ====================

	// Instance

	Model.prototype.confirm = function () {
		try {
			this.confirmed = 1
			this.save()
			return this
		} catch (e) {
			return e
		}
	}

  	// Class

	Model.alreadyExists = async function (parrainId, fillotId) {

		const result = await this.findOne({
			where: {
				parrainId,
				fillotId,
			}
		})
			
		return result ? true : false
	}


	return Model
}
