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

/**
 * This is a testing function.
 */
describe('Function testing - routes', () => {
    
    /**
    * Tests for when user is logged in.
    */
    describe('When logged in', () => {
        
        let email = 'test@mail.com',
            password = 'Test123',
            loginCredentials = {
                'email': email,
                'password': password
            };
        
        // .agent() gives user-auth support
        let requester = chai.request.agent(server);
        
        before((done) => {
            requester
                .post('/login/local')
                .send(loginCredentials)
                .end(function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.redirectTo(`${host}/profile`);
                    done();
                });
        });

        after((done) => {
            pool.query(queries.del_test_table, [email], (err) => {
                if (err) { throw err; }
                console.log('TEST TABLE DELETED')
                done();
            });
            //done();
        });
        
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
            it('should get a response from /info', (done) => {
                requester
                    .get('/info')
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
            it('should get a response from /profile', (done) => {
                requester
                    .get('/profile')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            it('should get a response from /articles', (done) => {
                requester
                    .get('/articles')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            it('/create should redirect to /profile', (done) => {
                requester
                    .get('/create')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.redirectTo(`${host}/profile`);
                        done();
                    });
            });
            it('/login should redirect to /profile', (done) => {
                requester
                    .get('/login')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.redirectTo(`${host}/profile`);
                        done();
                    });
            });
            it('/forgot should redirect to /profile', (done) => {
                requester
                    .get('/forgot')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.redirectTo(`${host}/profile`);
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
            it('should get all articles from logged in user', (done) => {
                requester
                    .get('/user/articles')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        
        });
        
        /**
        * POST routes.
        */
        describe('POST', () => {

            it('should add an article', (done) => {
                requester
                    .post('/user/articles')
                    .type('form')
                    .send({
                        'title': 'test_title',
                        'message': 'test_message'
                    })
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            
        });
        
        /**
        * PUT routes.
        */
        describe('PUT', () => {
            
            it('should change an article', (done) => {
                requester
                    .put('/user/articles/1')
                    .type('form')
                    .send({
                        'title': 'test_title_changed',
                        'message': 'test_message_changed'
                    })
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            
        });
        
        /**
        * DELETE routes.
        */
        describe('DELETE', () => {
            
            it('should delete an article', (done) => {
                requester
                    .delete('/user/articles/1')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            
        });
        
    });
    
});
