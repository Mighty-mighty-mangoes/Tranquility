const Sequelize = require('sequelize');
const db = require('../db');

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = OrderItem;
