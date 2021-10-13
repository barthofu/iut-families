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

	Model.prototype.updateSecs = async function (increment) {
		try {
			this.secs += increment
			this.save()
			return this
		} catch (e) {
			return e
		}
	}

	// Class

	Model.getUserById = async function (id, excludeSecret) {

		const user = await db.user.findOne(excludeSecret ? { where: { id }, attributes: { exclude: ['secret'] } } : {
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
