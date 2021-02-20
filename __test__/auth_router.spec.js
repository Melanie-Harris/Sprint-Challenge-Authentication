const request = require('supertest'); 

const server = require('../api/server.js');
const jokes = require('../jokes/jokes-router.js');


describe('auth-router.js', () => {
    it('Testing to see if testers are actually working.', () => {
        expect(1).toBe(1)
    })
     // ***********************Testing end-points starts here
     
        describe('post api/auth/reg users', () => {
            describe('post api/jokes', () => {
                it('expects data type to be json, needed to complete request', () => {
                    request(jokes)
                        .get('/jokes')
                        .set('Accept', 'application/json')//it accepts this file as being written in Json
                        .expect('Content-Type', /json/)
                });
            });

            describe('post api/jokes', () => {
                it('check if route is setup correctly and renders jokes, status code 201 should appear', () => {
                    request(jokes)
                        .get('/jokes')
                        .expect(200)
                });
            });
            it('checking status code  201 for proper functionality',  () => {
                request(server) 
                    .post('/reg')
                    .send({ username: 'Jasmina', password: 'NameMe' })
                    .expect(201)
            })

            describe('post api/auth/login users', () => {
                it('expects data type to be json, needed to complete request', () => {
                    request(server)
                        .post('/reg')
                        .send({ username: 'Jasmina', password: 'NameMe' })
                        .expect('Type', /json/)
                });
            });

            describe('post api/auth/login users', function () {
                it('check if login was successful, status 201 should appear', () => {
                    request(server)
                        .post('/login')
                        .send({ username: 'Jasmina', password: 'NameMe' })
                        .expect(201)
                });
            });

            describe('post api/auth/login users', () => {
                it('expects data type to be json, needed to complete request', () => {
                    request(server)
                        .post('/login')
                        .send({ username: 'Jasmina', password: 'NameMe' })
                        .expect('Type', /json/)
                });
            });
    });
});