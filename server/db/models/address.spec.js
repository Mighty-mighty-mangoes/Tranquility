/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Address = db.model('Address')

describe('Address model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    beforeEach(async () => {
      it('returns an error if the wrong zip code is given', async () => {
        try {
          let wrongAddress = await Address.create({
            houseNumber: 123,
            streetName: 'Cherry Tree Lane',
            city: 'Beverly Hills',
            state: 'California',
            zipCode: 45
          })
          if (wrongAddress) {
            throw Error('Validation should fail on a non-zip-code')
          }
        } catch (err) {
          expect(err.message).to.not.have.string(
            'Validation should have failed'
          )
        }
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
