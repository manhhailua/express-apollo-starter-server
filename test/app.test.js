const request = require('supertest');

const app = require('../app');

describe('App', () => {
  test('should be ok', () => {
    expect(app).toBeTruthy();
  });

  describe('404', () => {
    test('should show a 404 error page', (done) => {
      request(app)
        .get('/path/to/nowhere')
        .expect(404, done);
    });
  });
});
