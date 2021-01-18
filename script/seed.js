'use strict';

const db = require('../server/db');
const addressSeed = require('./seeding/addresses');
const userSeed = require('../script/seeding/user');
const seedCandles = require('./seeding/candles');
const seedOrders = require('./seeding/order');

// Seeds the database
async function runSeed() {
  console.log('seeding...');
  try {
    await db.sync({force: true});
    console.log('db synced!');

    await userSeed();
    await addressSeed();
    await seedCandles();
    await seedOrders();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `runSeed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}
// we export the seed function for testing purposes (see `./seed.spec.js`)

module.exports = runSeed;
