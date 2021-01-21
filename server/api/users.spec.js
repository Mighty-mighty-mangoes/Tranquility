/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com';

    beforeEach(() => {
      return User.create({
        firstName: 'cody',
        lastName: 'pug',
        email: 'cody@puppybook.com',
        password: 'bones',
      });
    });

    it('GET /api/users responds with a 500 for non-admin', async () => {
      await request(app).get('/api/users').expect(500);
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
