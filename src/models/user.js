const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.define('user', {
    id: {
		autoIncrement: true,
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true
    },
    firstName: {
		type: DataTypes.STRING(64),
		allowNull: false
    },
    lastName: {
		type: DataTypes.STRING(64),
		allowNull: false
    },
    birthdate: {
		type: DataTypes.DATEONLY,
		allowNull: true
    },
    description: {
		type: DataTypes.STRING(1000),
		allowNull: true
    },
    secs: {
		type: DataTypes.TINYINT,
		allowNull: true,
		defaultValue: 0
    },
    secret: {
		type: DataTypes.STRING(255),
		allowNull: false
    },
	admin: {
		type: DataTypes.TINYINT,
		allowNull: true,
		defaultValue: 0
    },
	confirmed: {
		type: DataTypes.TINYINT,
		allowNull: true,
		defaultValue: 0
    },
	createdAt: {
		type: Sequelize.DATE
    },
    updatedAt: {
		type: Sequelize.DATE
    },
	}, {
		sequelize,
		tableName: 'user',
		timestamps: true,
		indexes: [
			{
				name: "PRIMARY",
				unique: true,
				using: "BTREE",
				fields: [
				{ name: "id" },
				]
			}
		]
	})

	// =================== METHODS ====================

	// Instance

	Model.prototype.addSecs = async function (increment) {
		try {
			this.secs += increment
			this.save()
			return this
		} catch (e) {
			return e
		}
	}

	Model.prototype.updateDescription = async function (description) {
		try {
			this.description = description
			this.save()
			return this
		} catch (e) {
			return e
		}
	}

	Model.prototype.hasFillot = async function (fillotId) {
		
		const result = await db.family_relation.findOne({
			where: {
				parrainId: this.id,
				fillotId,
				confirmed: 1
			}
		})

		return result ? true : false
	}

	Model.prototype.hasParrain = async function (parrainId) {
		
		const result = await db.family_relation.findOne({
			where: {
				parrainId,
				fillotId: this.id,
				confirmed: 1
			}
		})

		return result ? true : false
	}

	// Class

	Model.getUserById = async function (id, excludeSecret) {

		const user = await db.user.findOne(excludeSecret ? { where: { id, confirmed: 1 }, attributes: { exclude: ['secret'] } } : {
			where: { id },
		})

		// console.log('fuck you my love <3')
		
		return user
	}

	Model.getAllUsers = async () => {

		return this.findAll()
	}


	return Model
}
