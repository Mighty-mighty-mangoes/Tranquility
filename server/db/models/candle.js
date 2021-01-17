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
  formattedPrice: {
    //for display view
    type: Sequelize.VIRTUAL,
    get() {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format((this.price / 100).toFixed(2));
    },
  },
});

Candle.beforeCreate((candle) => {
  let lowerCase = `${candle.name.toLowerCase()}`;
  candle.name = lowerCase;
});

//to make ingredients list sentence ready-tested in repl
Candle.properIngredients = function (candle) {
  let array = candle.ingredients;
  let last = array.pop().toString();
  let ready = array.join(', ');

  return ready.concat(`, and ${last}`);
};

module.exports = Candle;
