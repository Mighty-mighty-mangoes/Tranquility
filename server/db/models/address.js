const Sequelize = require('sequelize');
const db = require('../db');

const Address = db.define('address', {
  street: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  zipCode: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 10000,
      max: 99999,
    },
  },
});

module.exports = Address;
