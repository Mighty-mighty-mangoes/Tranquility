// Seeding file for the CartItems model
// Note that the candles and users tables should be non-empty before this seeding method is run
const {Candle, CartItem, User} = require('../../server/db/models');
const {getRandomInteger, getRandomElement} = require('./helper_functions');
const NUM_CART_ITEMS = 100;
const MAX_QUANTITY = 40;

const seedCartItems = async () => {
  const users = await User.findAll();
  const candles = await Candle.findAll();
  const quantities = [];
  for (let i = 0; i < NUM_CART_ITEMS; i++) {
    quantities.push(getRandomInteger(MAX_QUANTITY));
  }
  const cartItems = await Promise.all(
    quantities.map((quantity) => CartItem.create({quantity}))
  );
  for (let i = 0; i < NUM_CART_ITEMS; i++) {
    await cartItems[i].setUser(getRandomElement(users));
    await cartItems[i].setCandle(getRandomElement(candles));
  }
};

module.exports = seedCartItems;
