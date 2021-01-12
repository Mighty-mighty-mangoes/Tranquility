/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Candle = db.model('candle')

describe('Candle model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})
