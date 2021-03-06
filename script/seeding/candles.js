/* eslint-disable no-empty */
const faker = require('faker');
const {Candle} = require('../../server/db/models');
const {
  getRandomBoolean,
  getRandomInteger,
  getRandomElement,
} = require('./helper_functions');

const NUM_CANDLES = 100;
const MAX_PRICE = 4000;
const MAX_STOCK = 100;

const COLORS = Candle.rawAttributes.color.values;
const SIZES = Candle.rawAttributes.size.values;
const THEMES = Candle.rawAttributes.theme.values;

const seedCandles = async () => {
  const candleSettings = [];
  for (let i = 0; i < NUM_CANDLES; i++) {
    candleSettings.push({
      name: faker.random.word(),
      color: getRandomElement(COLORS),
      price: getRandomInteger(MAX_PRICE),
      size: getRandomElement(SIZES),
      novelty: getRandomBoolean(0.2),
      description: faker.commerce.productDescription(),
      stock: getRandomInteger(MAX_STOCK),
      theme: getRandomElement(THEMES),
      imageUrl: faker.image.imageUrl(),
    });
  }
  try {
    await Promise.all(
      candleSettings.map((candleSetting) => Candle.create(candleSetting))
    );
  } catch (error) {}
};

module.exports = seedCandles;
