const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  sessionID: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  purchased: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
});

module.exports = Order;
