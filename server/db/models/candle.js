const Sequelize = require('sequelize');
const db = require('../db');

const Candle = db.define('candle', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  color: {
    type: Sequelize.ENUM(
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'purple',
      'black',
      'white',
      'brown'
    ),
  },
  // Price of a candle in cents
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  size: {
    type: Sequelize.ENUM('small', 'medium', 'large', 'extra-large'),
  },
  novelty: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {min: 0},
  },
  theme: {
    type: Sequelize.ENUM('candles for coders', 'flowers', 'spices', 'food'),
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: '/default.jpg',
  },
});

module.exports = Candle;
