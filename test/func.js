// https://www.chaijs.com/plugins/chai-http/
let chai = require('chai');
let expect  = chai.expect;
let chaiHttp = require('chai-http');
let server = require('../server');

chai.use(chaiHttp);

// can use server or url
let host;// = "http://" + process.env.IP + ':' + process.env.PORT;
    host = 'https://grilled-dessert.glitch.me/'; // 'http://localhost:3000'

describe('Function testing - routes', () => {
    describe('GET', function() {
        let path = "/";
        it('should get a response from /', function(done) {
            chai.request(server)
                .get(path)
                //.set('content-type', 'application/x-www-form-urlencoded')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('GET', function() {
        let path = "/dash";
        it('should get a response from : /dash', function(done) {
            chai.request(server)
                .get(path)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('GET', function() {
        let path = "/pages";
        it('should get a response from : /pages', function(done) {
            chai.request(server)
                .get(path)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('GET', function() {
        let path = "/login";
        it('should get a response from : /login', function(done) {
            chai.request(server)
                .get(path)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('GET', function() {
        let path = "/create";
        it('should get a response from : /create', function(done) {
            chai.request(server)
                .get(path)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('GET', function() {
        let path = "/info";
        it('should get a response from : /info', function(done) {
            chai.request(server)
                .get(path)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('GET', function() {
        let path = "/privacy";
        it('should get a response from : /privacy', function(done) {
            chai.request(server)
                .get(path)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('GET', function() {
        let path = "/forgot";
        it('should get a response from : /forgot', function(done) {
            chai.request(server)
                .get(path)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    /*describe('POST', function() {
        let path = "/forgot";
        it('should get a response from : /forgot', function(done) {
            chai.request(server)
                .post(path)
                .send({email: 'my_email@mail.com'})
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });*/

    describe('GET', function() {
        let path = "/start";
        it('should get a response from : /start', function(done) {
            chai.request(server)
                .get(path)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    /*describe('GET', function() {
        let path = "/download";
        it('should get a response from : /download', function(done) {
            chai.request(server)
                .get(path)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });*/

    describe('GET', function() {
        let path = "/contact";
        it('should get a response from : /contact', function(done) {
            chai.request(server)
                .get(path)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    /*describe('POST', function() {
        let path = "/contact";
        it('should get a response from : /contact', function(done) {
            chai.request(server)
                .post(path)
                .send({email: 'my_email@mail.com', name: 'First Last', message: 'Some text.'})
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });*/

    /*describe('Auth', function() {
        let path = "/auth";
        it('should authenticate at : /auth', function(done) {
            chai.request(host)
                .get(path)
                .auth('user', 'pass')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });*/
});
