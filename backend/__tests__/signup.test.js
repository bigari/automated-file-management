const app = require('../app');
const db = require('../database/models/index');
const request = require("supertest");

const encodeObject = function(params) {
    var query = [];
    for (let key in params) {
      let val = encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      query.push(val);
    }
    return query.join('&');
}

beforeAll(async () => {
    // Sync all models that aren't already in the database
    await db.sequelize.sync();
});

describe('Testing auth', function() {

    it('should signup the user', function(done) {
        const user = {
            email: 'test@gmail.com',
            username: 'test',
            password: 'test'
        };

        request(app)
        .post('/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(encodeObject(user))
        .expect(200, done)
    });

    it('should return an error', function(done) {
        const user = {
            email: 'test@gmail.com',
            username: 'user',
            password: 'test'
        };

        request(app)
        .post('/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(encodeObject(user))
        .expect(422, { errors: { email: 'Email already in use' } }, done)
    });
});