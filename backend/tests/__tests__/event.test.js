const app = require('../../app');
const db = require('../../database/models/index');
const request = require("supertest");
const assert = require('assert').strict;
import {signup, getJwt, getUserId} from "../auth-helper";


const Event = db.Event;
let jwt;
let id;

beforeAll(async () => {
    await db.sequelize.drop();
    await db.sequelize.sync();

    // collectes the jwt from the signup response
    const res = await signup()
    jwt = getJwt(res)
    id = getUserId(res)
})

describe('Testing events', function() {
    
    beforeEach(async () => {
        await Event.create({
            startAt: new Date(),
            endAt: new Date(),
            name: 'event 1',
            ownerId: id
        })
        await Event.create({
            startAt: new Date(),
            endAt: new Date(),
            name: 'event 2',
            ownerId: id
        })
    })

    it('lists events', function(done) {
        request(app)
        .get('/events')
        .set("Authorization", `Bearer ${jwt}`)
        .expect(200)
        .expect((res) => {
            assert.strictEqual(res.body.events.length, 2)
            assert.strictEqual(res.body.events[0].name, 'event 1')
        })
        .end(done)
    });

    it('creates an event', (done) => {
        const newEvent = {
            startAt: new Date(),
            endAt: new Date(),
            name: 'event 3'
        }

        request(app)
        .post('/events')
        .set("Authorization", `Bearer ${jwt}`)
        .set("Content-Type", "application/json")
        .send(newEvent)
        .expect(200, done)
    })

});
