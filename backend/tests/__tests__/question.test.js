const app = require('../../app');
const db = require('../../database/models/index');
const request = require("supertest");
const assert = require('assert').strict;
import {signup, getJwt, getUserId} from "../auth-helper";


const Question = db.Question;
const Event = db.Event;
let jwt;
let id;
let eid;

beforeAll(async () => {
    await db.sequelize.drop();
    await db.sequelize.sync();

    // collectes the jwt from the signup response
    const res = await signup()
    jwt = getJwt(res)
    id = getUserId(res)

    const event = await Event.create({
        startAt: new Date(),
        endAt: new Date(),
        name: 'event 1',
        ownerId: id
    })

    eid = event.id
})

describe('Testing questions', function() {
    
    beforeEach(async () => {
        await Question.create({
            eid: eid,
            content: "reply 1",
            timestamp: new Date(),
            reply: null
        })        
    })  

    it('lists questions', function(done) {
        request(app)
        .get(`/events/${eid}/qas`)
        .set("Authorization", `Bearer ${jwt}`)
        .expect(200)
        .expect((res) => {
            assert.strictEqual(res.body.questions.length, 1)
            assert.strictEqual(res.body.questions[0].content, 'reply 1')
        })
        .end(done)
    });
});
