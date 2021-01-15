/* eslint-disable no-unused-expressions */
const {expect} = require('chai');
const db = require('../index');
const Candle = db.model('candle');

describe('Candle model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });
  it('uses default values for novelty and stock fields', async () => {
    const candle = await Candle.create({name: 'sample candle'});
    expect(candle.novelty).to.be.false;
    expect(candle.stock).to.equal(0);
  });
});
