const express = require('express');
const request = require('supertest');

const notFoundHandler = require('../404');

// For route isolation testing purpose
let app;

describe('Not found error handler', () => {
  beforeEach(() => {
    app = express();
    app.set('view engine', 'pug').use(notFoundHandler);
  });

  test('should respond 404 error code', (done) => {
    request(app)
      .get('/')
      .expect(404, done);
  });
});
