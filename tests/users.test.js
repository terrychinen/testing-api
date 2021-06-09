const request = require('supertest');
const app = require('../src/app');

/**
 * Testing users endpoint
 */
describe('GET /users', () => {
    it('respond with json containing a list of all users', done => {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /users/:id', () => {
    it('respond with json containing a single user', done => {
        request(app)
            .get('/users/U0001')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('respond with json "user not found" when the user does not exists', done => {
        request(app)
            .get('/users/jniibubuy')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)            
            .expect({
                ok: false,
                message: 'User not found'
            })
            .end((err) => {
                if(err) return done(Err);
                done();
            });
    });
});

describe('POST /users', () => {
    it('respond with 201 created', done => {
        const user = {
            username: 'tery',
            password: '12345'
        };

        request(app)
            .post('/users')
            .send(user)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(err => {
                if(err) return done(err);
                done();
            });
    });

    it('respond with code 400 on bad request', done => {
        const data = {};
        request(app)
            .post('/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({
                ok: false,
                message: 'User not created'
            })
            .end((err) => {
                if(err) return done(err);
                done();
            });
    });
});