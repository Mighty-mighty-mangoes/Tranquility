const Sequelize = require('sequelize');
const db = require('../db');

const Address = db.define('address', {
  street: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zipCode: {
    type: Sequelize.INTEGER,
    validate: {
      min: 10000,
      max: 99999,
    },
  },
});

module.exports = Address;
