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
