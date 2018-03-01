const express = require('express');
const request = require('supertest');

// For route isolation testing purpose
const app = express();
const routeIndex = require('../index');

describe('Route /', () => {
  beforeAll(() => {
    app.set('view engine', 'pug');
    app.use('/', routeIndex);
  });

  test('should respond GET method with 200', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});
