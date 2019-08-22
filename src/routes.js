const express    = require('express');
const app        = express();
const mailer     = require('../src/mailer');
const passport   = require('passport');
const controller = require('./controllers');
const bcrypt     = require('bcrypt');
const saltRounds = 10;

const session        = require('express-session');
//const passport       = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const pool           = require('./db');
//const bcrypt         = require('bcrypt');

module.exports = function(app) {
    
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        console.log('auth-seri: ', user.rows[0]);
        done(null, user.rows[0]);
    });

    passport.deserializeUser((id, done) => {
        console.log('auth-deseri: ', user);
        pool.query('select * from sprout_users where id=$1', [id], (err, data) => {
            if (err) {
                console.log(err.stack)
            } else {
                done(null, data.rows);
            }
        });
    });

    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }, function(email, password, done) {
            console.log('auth: ', email, password);
            pool.query('SELECT * FROM sprout_users WHERE user_email=($1)', [email], function (err, data) {
                if (err) { return done(err); }
                if (!data) { return done(null, false); }
                let user_pass = data.rows[0].user_pass;
                bcrypt.compare(password, user_pass, function(err, res) {
                    if (res) { return done(null, data); }
                    else { return done(null, false); }
                }) 
            });
        }
    ));

    app.get('/', function(req, res) {
        res.sendFile(process.cwd() + '/views/index.html');
    });

    app.get('/profile', function(req, res) {
        // profile - template?
        res.sendFile(process.cwd() + '/views/profile.html');
    });

    app.get('/articles', function(req, res) {
        res.sendFile(process.cwd() + '/views/articles.html');
    });

    app.route('/db/articles')
        .get(function(req, res) {
            let data = controller().getArticles();
            res.json(data)
        })
        .post(function(req, res) {
            let data = controller().addArticle(req.body);
            res.json(data)
        })
        .put(function(req, res) {
            let data = controller().editArticle(req.body);
            res.json(data)
        })
        .delete(function(req, res) {
            let data = controller().removeArticle(req.body);
            res.json(data)
        });

    app.get('/login', function(req, res) {
        res.sendFile(process.cwd() + '/views/login.html');
    });

    app.route('/contact')
        .get(function(req, res) {
            res.sendFile(process.cwd() + '/views/contact.html');
        })
        .post(function(req, res) {
            // subject to db or email?
            mailer(req.body, 'contact');
            // response that it was sent or not
            res.redirect('/thanks');
        });

    app.get('/info', function(req, res) {
        res.sendFile(process.cwd() + '/views/info.html');
    });

    app.route('/create')
        .get(function(req, res) {
            res.sendFile(process.cwd() + '/views/create.html');
        })
        .post(function(req, res) {
            // submit to db
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
            res.sendFile(process.cwd() + '/views/forgot.html');
        })
        .post(function(req, res) {
            // db to lookup pasword
            req.body.password = 'pass';
            mailer(req.body, 'forgot');
            // tell user to check their email
            res.redirect('/login');
        });

    app.get('/privacy', function(req, res) {
        res.sendFile(process.cwd() + '/views/privacy.html');
    });
  
    app.get('/thanks', function(req, res) {
        res.sendFile(process.cwd() + '/views/thanks.html');
    });

    app.get('/download', function(req, res) {
        // download website? different versions? compressed?
        res.sendFile(process.cwd() + '/data/create.bat');
    });





    app.get('/example', require('connect-ensure-login')
            .ensureLoggedIn(), function(req, res) {
                res.render('profile', { user: req.user });
            });

    app.post('/login/local', passport.authenticate('local', 
          { failureRedirect: '/login', successRedirect: '/profile' }));

    /*app.route('/login/github')
        .get(passport.authenticate('github'));

    app.route('/auth/github/callback')
        .get(passport.authenticate('github', { failureRedirect: '/' }),
            function(req,res) {
                req.session.user_id = req.user.id;
                res.redirect('/');
            });*/

}