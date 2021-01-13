const router = require('express').Router()
const {Candle} = require('../db/models/candle')

//get all candles=update to be secure
router.get('/', async (req, res, next) => {
  try {
    const allCandles = await Candle.findAll()
    res.send(allCandles)
  } catch (err) {
    console.log('error in get api/candles')
    next(err)
  }
})
//get single candle by id=update to be secure
router.get('/:candleId', async (req, res, next) => {
  try {
    const singleCandle = await Candle.findByPk(req.params.candleId)
    res.send(singleCandle)
  } catch (err) {
    console.log('error in api/:candleId')
    next(err)
  }
})

module.exports = router
