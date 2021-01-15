// Seeding file for the Order model
// Note that the candles and users tables should be non-empty before this seeding method is run
const {Candle, User} = require('../../server/db/models');
const {getRandomInteger} = require('./helper_functions');
const MAX_QUANTITY = 40;

// Creates an order with attribute purchased = false for each user in the database.
// Each order will have 0-5 order items with distinct candleId values; this is enforced by selecting candles from different intervals of the list of candles.
const seedOrders = async () => {
  const users = await User.findAll();
  const candles = await Candle.findAll();
  for (let i = 0; i < users.length; i++) {
    const order = await users[i].createOrder();
    const numItems = getRandomInteger(6);
    if (numItems > 0) {
      const stepSize = Math.ceil(candles.length / numItems);
      for (let j = 0; j < candles.length - stepSize; j += stepSize) {
        await order.createOrderItem({
          candleId: candles[j + getRandomInteger(stepSize)].id,
          quantity: getRandomInteger(MAX_QUANTITY),
        });
      }
    }
  }
};

module.exports = seedOrders;
