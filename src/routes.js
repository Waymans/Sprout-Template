'use strict';

const express    = require('express');
const app        = express();
const mailer     = require('../src/mailer');
const passport   = require('passport');
const bcrypt     = require('bcrypt');
const saltRounds = 10;
const auth       = require('./auth');
const connect    = require('connect-ensure-login');
const pool       = require('./db');
const queries    = require('./queries');

module.exports = (app) => {
    
    auth(app);

    // any user can see
    app.get('/', (req, res) => {
        res.render('index', { user: req.user })
    });
    
    app.get('/login', (req, res) => {
        req.user ? res.redirect('/profile')
        : res.render('login', { user: undefined })
    });
    
    app.get('/info', (req, res) => {
        res.render('info', { user: req.user })
    });
    
    app.get('/privacy', (req, res) => {
        res.render('privacy', { user: req.user })
    });
    
    app.get('/thanks', (req, res) => {
        res.render('thanks', { user: req.user })
    });
    
    app.get('/download', (req, res) => {
        res.sendFile(process.cwd() + '/data/create.bat');
    });
    
    app.route('/contact')
        .get((req, res) => {
            res.render('contact', { user: req.user })
        })
        .post((req, res) => {
            //mailer(req.body, 'contact');
            res.redirect('/thanks');
        });
    
    app.route('/create')
        .get((req, res) => {
            req.user ? res.redirect('/profile') 
            : res.render('create', { user: undefined })
        })
        .post((req, res) => {
            pool.query(queries.find_user, [req.body.email], (err, data) => {
                if (err) { throw err; }
                if (!data.rows[0]) {
                    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                        pool.query(queries.create_user, [req.body.first, req.body.last, req.body.email, hash], (err) => {
                            if (err) { throw err; }
                            //mailer(req.body, 'create');
                            res.redirect('/login');
                        })
                    });
                } else {
                    res.redirect('/create');
                }
            })
        });
    
    app.route('/forgot')
        .get((req, res) => {
            req.user ? res.redirect('profile') 
            : res.render('forgot', { user: undefined })
        })
        // just an example, dont use in production
        // see Forgot Password at https://cheatsheetseries.owasp.org/
        .post((req, res) => {
            pool.query(queries.forgot_user, [req.body.email], (err, data) => {
                if (err) { throw err; }
                req.body.password = data.rows[0].user_pass;
                mailer(req.body, 'forgot');
                res.redirect('/login');
            })
        });

    app.post('/login/local', passport.authenticate('local', 
        { failureRedirect: '/login', successRedirect: '/profile' }));
    
    // have to be logged in
    app.get('/profile', connect.ensureLoggedIn('/login'), (req, res) => {
        res.render('profile', { user: req.user });
    });
    
    app.get('/articles', connect.ensureLoggedIn('/login'), (req, res) => {
        res.render('articles', { user: req.user });
    });

    app.route('/user/articles')
        .get((req, res) => {
            pool.query(queries.get_articles, [req.user.id], (err, data) => {
                if (err) { throw err; }
                res.json(data.rows[0]);
            })
        })
        .post((req, res) => {
            pool.query(queries.add_article, [req.body.title, req.body.message, req.user.id], (err) => {
                if (err) { throw err; }
                res.json('posted');
            })
        })
    
    app.route('/user/articles/:articleIndex')
        .put((req, res) => {
            pool.query(queries.edit_article, [req.params.articleIndex, req.body.title, req.body.message, req.user.id], (err) => {
                if (err) { throw err; }
                res.json('updated');
            })
        })
        .delete((req, res) => {
            pool.query(queries.del_article, [req.params.articleIndex, req.user.id], (err) => {
                if (err) { throw err; }
                res.send('deleted');
            })
        });
    
    app.get('/logout', (req, res) => {
        req.logout();
        req.session.destroy( (err) => {
            res.redirect('/');
        });
    });

}