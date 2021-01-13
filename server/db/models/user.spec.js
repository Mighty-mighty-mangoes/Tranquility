/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  //USER FULLNAME
  // describe('user', () => {
  //   describe('fullName', () => {
  //     let cody

  //     beforeEach(async () => {
  //       cody = await User.create({
  //         firstName: 'jennifer',
  //         lastName: 'franco',
  //       })
  //     })
  //     it('fullName should be formatted corrently', () => {
  //       expect(cody.fullName('jennifer', 'franco')).to.deep.equal(
  //         'Jennifer Franco'
  //       )
  //     })
  //   })
  // }) // end describe('fullName')

  //EMAIL FIELD---HEATHER might need to fix this to define
  // describe('email', () => {
  //   it('email cannot be empty', async () => {
  //     // We shouldn't be able to create a user without an email address.
  //     await expect(
  //       User.create({email: ''}),
  //       "We shouldn't be able to create a user with no email"
  //     ).to.be.rejected
  //   })

  //   it('email must be unique', async () => {
  //     // We shouldn't be able to create two users with the same name.
  //     await User.create({email: 'cody@gmail.com'})
  //     await expect(
  //       User.create({email: 'cody@gmail.com'}),
  //       "Shouldn't be able to create two users with the same name "
  //     ).to.be.rejected
  //   })
  // })

  //NAME FIELD-HEATHER=> have to see if this is written correctly

  // describe('firstName', () => {
  //   it('firstName cannot be empty', async () => {
  //     // We shouldn't be able to create a user without a firstName.
  //     await expect(
  //       User.create({firstName: ''}),
  //       "We shouldn't be able to create a user with no firstName"
  //     ).to.be.rejected
  //   })

  //   it('lastName cannot be empty', async () => {
  //     // We shouldn't be able to create two users with the same name.
  //     await expect(
  //       User.create({lastName: ''}),
  //       "Shouldn't be able to create a user with no lastName "
  //     ).to.be.rejected
  //   })
  // })
}) // end describe('User model')
