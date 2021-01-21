const Sequelize = require('sequelize');
const db = require('../db');

const Address = db.define('address', {
  street: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: false,
    },
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: false,
    },
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: false,
    },
  },
  zipCode: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      min: 10000,
      max: 99999,
      notEmpty: false,
    },
  },
});

module.exports = Address;
