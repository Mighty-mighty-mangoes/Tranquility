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
    const {candleId} = req.params;
    const singleCandle = await Candle.findByPk(candleId);
    res.send(singleCandle);
  } catch (err) {
    console.log('error in api/:candleId');
    next(err);
  }
});

//Admin accessible only

const isAdmin = (req, res, next) =>
  req.user.isAdmin ? next() : res.send('None shall pass!');

router.delete('adminDelete/:candleId', isAdmin, async (req, res, next) => {
  try {
    const {candleId} = req.params;
    const toDelete = await Candle.findByPk(candleId);
    if (!toDelete) return res.sendStatus(404);
    await toDelete.destroy();
  } catch (err) {
    console.log('error in api/admin delete candle');
    next(err);
  }
});

router.post('adminAdd/:candle', isAdmin, async (req, res, next) => {
  try {
    const {name, size, stock, theme, description, price} = req.params.candle;
    const newCandle = await Candle.create({
      name,
      size,
      stock,
      theme,
      description,
      price,
    });
    res.send(newCandle);
  } catch (err) {
    console.log('error in api/admin delete candle');
    next(err);
  }
});

module.exports = router;
