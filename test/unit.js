// https://www.chaijs.com/plugins/chai-http/
let chai = require('chai');
let expect  = chai.expect;
let assert = chai.assert;
let chaiHttp = require('chai-http');
let server = require('../server');

chai.use(chaiHttp);

// can use server or url
let host;// = "http://" + process.env.IP + ':' + process.env.PORT;
    host = 'https://grilled-dessert.glitch.me/'; // 'http://localhost:3000'

describe('Unit testing - ', () => {
  
});
