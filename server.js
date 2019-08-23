const express = require('express');
const app = express();
const routes = require('./src/routes');
//const socket = require('./src/socket');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

const isProduction = process.env.NODE_ENV === 'production';
const origin = {
    origin: isProduction ? 'https://www.example.com' : '*',
}

// only allow access on own domain in production
app.use(cors(origin));
// compression middleware
app.use(compression());
// secure http headers
app.use(helmet());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static('images'));

app.set('view engine', 'pug');

routes(app);
//socket(app);

//404 Not Found Middleware
app.use(function(req, res, next) {
    res.status(404).render('error');
});

app.listen(3000, function() {
    console.log('Your app is listening on port 3000');
});

module.exports = app; // for testing