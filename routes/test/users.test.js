const express = require('express');
const request = require('supertest');

// For route isolation testing purpose
const app = express();
const routeUsers = require('../users');

describe('Route /users', () => {
  beforeAll(() => {
    app.set('view engine', 'pug');
    app.use('/users', routeUsers);
  });

  test('should respond GET method with 200', (done) => {
    request(app)
      .get('/users')
      .expect(200, done);
  });
});
