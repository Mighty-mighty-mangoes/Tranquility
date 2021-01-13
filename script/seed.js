'use strict'

const db = require('../server/db')

const addressSeed = require('./addresses')

const userSeed = require('../script/seeding/user')
const seedCandles = require('./seeding/candles')

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await db.sync({force: true})
    console.log('db synced!')

    await userSeed()
    await addressSeed()
    await seedCandles()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}
// we export the seed function for testing purposes (see `./seed.spec.js`)
// module.exports = seed

module.exports = runSeed
