const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  houseNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
      min: 0
    }
  },
  streetName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  zipCode: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 10000,
      max: 99999
    }
  }
})

module.exports = Address
