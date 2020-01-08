const app = require('../../app')
const db = require('../../database/models/index')
const request = require("supertest")
const {urlEncode} = require("../auth-helper")

beforeAll(async () => {
    // Sync all models that aren't already in the database
    await db.sequelize.drop()
    await db.sequelize.sync()
})

describe('Testing auth', function() {

    it('should signup the user', function(done) {
        const user = {
            email: 'case1@gmail.com',
            username: 'case1',
            password: 'case1'
        }

        request(app)
        .post('/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(urlEncode(user))
        .expect(200, done)
    })

    it('Email already in use', function(done) {
        const user = {
            email: 'case1@gmail.com',
            username: 'case2',
            password: 'case2'
        }

        request(app)
        .post('/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(urlEncode(user))
        .expect(422, { errors: { email: 'Email already in use' } }, done)
    })

    it('Username already in use', function(done) {
        const user = {
            email: 'case3@gmail.com',
            username: 'case1',
            password: 'case3'
        }

        request(app)
        .post('/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(urlEncode(user))
        .expect(422, { errors: { username: 'Username already in use' } }, done)
    })

    it('should return 200 status code', function(done) {
        const user = {
            email: 'case1@gmail.com',
            password: 'case1'
        }

        request(app)
        .post('/signin')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(urlEncode(user))
        .expect(200, done)
    })

})
