/* global describe beforeEach it */

const {expect} = require('chai');
const db = require('../index');
const User = db.model('user');

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  const data = {
    firstName: 'cody',
    lastName: 'pug',
    email: 'cody@puppybook.com',
    password: 'bones',
  };
  it('returns true if the password is correct', async () => {
    const cody = await User.create(data);
    expect(cody.correctPassword('bones')).to.be.equal(true);
  });
    it('returns false if the password is incorrect', async () => {
      const cody = await User.create(data);
      expect(cody.correctPassword('bonez')).to.be.equal(false);
    });
    it('users default to false for admin', async () => {
      const cody = await User.create(data);
      expect(cody.isAdmin).to.be.equal(false);
    });
  it('first and last name are capitalized', async () => {
    const cody = await User.create(data);
    expect(cody.firstName).to.be.equal('Cody');
    expect(cody.lastName).to.be.equal('Pug');
  });
  it('virtual fullname to be correct', async () => {
    const cody = await User.create(data);
    expect(cody.fullName).to.be.equal('Cody Pug');
  });
});
