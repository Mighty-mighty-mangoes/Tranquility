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
  price: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      min: 0,
    },
  },
  ingredients: {
    type: Sequelize.ARRAY(
      Sequelize.ENUM(
        'lavender',
        'rose',
        'jasmine',
        'frankincense',
        'cinnamon',
        'gardenia'
      )
    ),
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

Candle.beforeCreate((candle) => {
  let lowerCase = `${candle.name.toLowerCase()}`;
  candle.name = lowerCase;
});

module.exports = Candle;
