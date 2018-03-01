const express = require('express');
const request = require('supertest');

const serverErrorHandler = require('../500');

// For route isolation testing purpose
let app = express();

describe('Server error handler', () => {
  describe('500', () => {
    let fakeError;

    beforeEach(() => {
      // Re-initialize app instance for each test
      app = express();
      app.set('view engine', 'pug');

      fakeError = new Error('some-error');
    });

    test('should show an 500 error page with message in development mode', (done) => {
      request(
        app
          .set('env', 'development')
          .use((req, res, next) => {
            next(fakeError);
          })
          .use(serverErrorHandler),
      )
        .get('/somewhere')
        .expect(500, done);
    });

    test('should show an 500 error page without message when not in development mode', (done) => {
      fakeError.status = 500;

      request(
        app
          .set('env', 'production')
          .use((req, res, next) => {
            next(fakeError);
          })
          .use(serverErrorHandler),
      )
        .get('/somewhere')
        .expect(500)
        .end((error, res) => {
          if (error) {
            return done(error);
          }

          expect(res.text.includes(fakeError.status)).toEqual(false);
          return done();
        });
    });
  });
});
