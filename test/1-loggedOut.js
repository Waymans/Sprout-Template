'use strict';

const chai      = require('chai');
const expect    = chai.expect;
const chaiHttp  = require('chai-http');
const pool      = require('../src/db');
const queries   = require('../src/queries');
let server      = require('../server');

chai.use(chaiHttp);

// can use server or url
let host = 'https://sprout-template.glitch.me';
    host = 'http://localhost:3000';

// for local testing
server = host;

let requester = chai.request(server).keepOpen();

/**
 * This is a testing function.
 */
describe('Function testing - routes', () => {
    
    /**
    * Tests for when user is not logged in.
    */
    describe('When logged out', () => {
        
        /**
        * GET routes.
        */
        describe('GET', () => {
        
            it('should get a response from /', (done) => {
                requester
                    .get('/')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            it('should get a response from /contact', (done) => {
                requester
                    .get('/contact')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            it('should get a response from /create', (done) => {
                requester
                    .get('/create')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            it('should get a response from /forgot', (done) => {
                requester
                    .get('/forgot')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            it('should get a response from /info', (done) => {
                requester
                    .get('/info')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            it('should get a response from /login', (done) => {
                requester
                    .get('/login')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            it('should get a response from /privacy', (done) => {
                requester
                    .get('/privacy')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            it('should get a response from /thanks', (done) => {
                requester
                    .get('/thanks')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            it('should get a 404 response', (done) => {
                requester
                    .get('/error')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(404);
                        done();
                    });
            });
            it('/profile should redirect to /login', (done) => {
                requester
                    .get('/profile')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.redirectTo(`${host}/login`);
                        done();
                    });
            });
            it('/articles should redirect to /login', (done) => {
                requester
                    .get('/articles')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.redirectTo(`${host}/login`);
                        done();
                    });
            });
        
        });
        
        /**
        * POST routes.
        */
        describe('POST', () => {
            
            it('should create user', (done) => {
                requester
                    .post('/create')
                    .type('form')
                    .send({
                        'first': 'test_first',
                        'last': 'test_last',
                        'email': 'test@mail.com',
                        'password': 'Test123'
                    })
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.redirectTo(`${host}/login`);
                        done();
                    });
            });
            it('should get user password', (done) => {
                requester
                    .post('/forgot')
                    .type('form')
                    .send({
                        'first': 'test_first',
                        'last': 'test_last',
                        'email': 'test@mail.com',
                        'password': 'Test123'
                    })
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.redirectTo(`${host}/login`);
                        done();
                    });
            });
            it('should send contact email', (done) => {
                requester
                    .post('/contact')
                    .type('form')
                    .send({
                        'first': 'test_first',
                        'last': 'test_last',
                        'email': 'test@mail.com',
                        'subject': 'test_subject',
                        'message': 'test_message'
                    })
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.redirectTo(`${host}/thanks`);
                        done();
                    });
            });
            requester.close();
        });
        
    });
    
});
