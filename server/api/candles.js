const router = require('express').Router();
const {Candle} = require('../db/models');

//get all candles -works
router.get('/', async (req, res, next) => {
  try {
    const allCandles = await Candle.findAll();
    res.send(allCandles);
  } catch (err) {
    console.log('error in get api/candles');
    next(err);
  }
});

//get food themed candles -works
router.get('/food', async (req, res, next) => {
  try {
    const foodCandles = await Candle.findAll({
      where: {theme: 'food'},
    });
    res.send(foodCandles);
  } catch (err) {
    console.log('error in api/candles/food');
    next(err);
  }
});

//get coder themed candles -works
router.get('/coders', async (req, res, next) => {
  try {
    const coderCandles = await Candle.findAll({
      where: {theme: 'candles for coders'},
    });
    res.send(coderCandles);
  } catch (err) {
    console.log('error in api/candles/food');
    next(err);
  }
});

//get flower themed candles -works
router.get('/flowers', async (req, res, next) => {
  try {
    const flowerCandles = await Candle.findAll({
      where: {theme: 'flowers'},
    });
    res.send(flowerCandles);
  } catch (err) {
    console.log('error in api/candles/food');
    next(err);
  }
});

//get spices themed candles -works
router.get('/spices', async (req, res, next) => {
  try {
    const spiceCandles = await Candle.findAll({
      where: {theme: 'spices'},
    });
    res.send(spiceCandles);
  } catch (err) {
    console.log('error in api/candles/food');
    next(err);
  }
});

//get single candle by id -works
router.get('/:candleId', async (req, res, next) => {
  try {
    const singleCandle = await Candle.findByPk(req.params.candleId);
    res.send(singleCandle);
  } catch (err) {
    console.log('error in api/:candleId');
    next(err);
  }
});

module.exports = router;
