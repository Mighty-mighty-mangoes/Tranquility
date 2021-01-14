'use strict';
/* global describe it */

const seed = require('./seed');
const db = require('../server/db');

describe('seed script', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  it('completes successfully', seed);
});
