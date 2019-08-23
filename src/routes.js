const express    = require('express');
const app        = express();
const mailer     = require('../src/mailer');
const passport   = require('passport');
const controller = require('./controllers');
const bcrypt     = require('bcrypt');
const saltRounds = 10;
const auth       = require('./auth');
const connect    = require('connect-ensure-login');

module.exports = function(app) {
    
    auth(app);

    // any user can see
    app.get('/', function(req, res) {
        res.render('index', { user: req.user })
    });
    
    app.get('/login', function(req, res) {
        req.user ? res.render('profile', { user: req.user })
        : res.render('login', { user: req.user })
    });
    
    app.get('/info', function(req, res) {
        res.render('info', { user: req.user })
    });
    
    app.get('/privacy', function(req, res) {
        res.render('privacy', { user: req.user })
    });
    
    app.get('/thanks', function(req, res) {
        res.render('thanks', { user: req.user })
    });
    
    app.get('/download', function(req, res) {
        res.sendFile(process.cwd() + '/data/create.bat');
    });
    
    app.route('/contact')
        .get(function(req, res) {
            res.render('contact', { user: req.user })
        })
        .post(function(req, res) {
            // subject to db or email?
            mailer(req.body, 'contact');
            res.redirect('/thanks');
        });
    
    app.route('/create')
        .get(function(req, res) {
            req.user ? res.render('profile', { user: req.user })
            : res.render('create', { user: req.user })
        })
        .post(function(req, res) {
            let password = req.body.password;
            bcrypt.hash(password, saltRounds, function(err, hash) {
                req.body.password = hash;
                controller().addUser(req.body);
                mailer(req.body, 'create');
                res.redirect('/login');
            });
        });
    
    app.route('/forgot')
        .get(function(req, res) {
            req.user ? res.render('profile', { user: req.user })
            : res.render('forgot', { user: req.user })
        })
        .post(function(req, res) {
            // db to lookup pasword
            req.body.password = 'pass';
            mailer(req.body, 'forgot');
            // tell user to check their email
            res.redirect('/login');
        });

    // have to be logged in
    app.post('/login/local', passport.authenticate('local', 
        { failureRedirect: '/login', successRedirect: '/profile' }));
    
    app.get('/profile', connect.ensureLoggedIn('/login'), function(req, res) {
        res.render('profile', { user: req.user });
    });
    
    app.get('/articles', connect.ensureLoggedIn('/login'), function(req, res) {
        res.render('articles', { user: req.user });
    });

    app.route('/db/articles')
        /*.get(function(req, res) {
            let data = controller().getArticles();
            res.json(data)
        })*/
        .post(function(req, res) {
            req.body.id = req.user.id;
            let data = controller().addArticle(req.body);
            res.json(data)
        })
        .put(function(req, res) {
            req.body.id = req.user.id;
            let data = controller().editArticle(req.body);
            res.json(data)
        })
        .delete(function(req, res) {
            req.body.id = req.user.id;
            let data = controller().removeArticle(req.body);
            res.json(data)
        });
    
    app.get('/logout', function(req, res){
        req.logOut();
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    });

}