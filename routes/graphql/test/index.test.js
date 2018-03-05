const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');

// For route isolation testing purpose
const app = express();
const routeGraphql = require('../index');

describe('Route', () => {
  beforeAll(() => {
    app.set('view engine', 'pug');
    app.use('/', bodyParser.json(), routeGraphql);
  });

  describe('/graphql', () => {
    test('should respond POST method with 200', (done) => {
      request(app)
        .post('/graphql')
        .send({ query: '{ books { title author } }' })
        .expect(200, done);
    });
  });

  describe('/graphiql', () => {
    test('should respond GET method with 200', (done) => {
      request(app)
        .get('/graphiql')
        .expect(200, done);
    });
  });
});
