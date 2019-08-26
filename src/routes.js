'use strict';

const express    = require('express');
const app        = express();
const mailer     = require('../src/mailer');
const passport   = require('passport');
//const controller = require('./controllers');
const bcrypt     = require('bcrypt');
const saltRounds = 10;
const auth       = require('./auth');
const connect    = require('connect-ensure-login');
const pool       = require('./db');

module.exports = (app) => {
    
    auth(app);

    // any user can see
    app.get('/', (req, res) => {
        res.render('index', { user: req.user })
    });
    
    app.get('/login', (req, res) => {
        req.user ? res.render('profile', { user: req.user })
        : res.render('login', { user: req.user })
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
            req.user ? res.render('profile', { user: req.user })
            : res.render('create', { user: req.user })
        })
        .post((req, res) => {
            pool.query('SELECT id FROM sprout_users WHERE user_email=$1', [req.body.email], (err, data) => {
                if (err) { throw err; }
                if (!data.rows[0]) {
                    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                        pool.query('INSERT INTO sprout_users (first_name, last_name, user_email, user_pass) VALUES ($1, $2, $3, $4)', [req.body.first, req.body.last, req.body.email, hash], (err) => {
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
            req.user ? res.render('profile', { user: req.user })
            : res.render('forgot', { user: req.user })
        })
        .post((req, res) => { // example to just sending password
            pool.query('SELECT user_pass FROM sprout_users WHERE user_email=($1)', [req.body.email], (err, data) => {
                if (err) { throw err; }
                req.body.password = data.rows[0].user_pass;
                //mailer(req.body, 'forgot');
                res.redirect('/login');
            })
        });

    app.post('/login/local', passport.authenticate('local', 
        { failureRedirect: '/login', successRedirect: '/profile' }));
    
    // have to be logged in
    app.get('/profile', connect.ensureLoggedIn('/login'), (req, res) => {
        console.log('test ************ :',req.user)
        res.render('profile', { user: req.user });
    });
    
    app.get('/articles', connect.ensureLoggedIn('/login'), (req, res) => {
        res.render('articles', { user: req.user });
    });

    app.route('/user/articles')
        .get((req, res) => {
            pool.query('SELECT user_titles, user_messages, created_article_on FROM sprout_users WHERE id=$1', [req.user.id], (err, data) => {
                if (err) { throw err; }
                res.json(data.rows[0]);
            })
        })
        .post((req, res) => {
            pool.query('UPDATE sprout_users SET user_titles = array_cat(user_titles, array[$1]), user_messages = array_cat(user_messages, array[$2]), created_article_on = array_cat(created_article_on, array[now()]) WHERE id=$3', [req.body.title, req.body.message, req.user.id], (err) => {
                if (err) { throw err; }
                res.json('posted');
            })
        })
    
    app.route('/user/articles/:articleIndex')
        .put((req, res) => {
            pool.query('UPDATE sprout_users SET user_titles = array_replace(user_titles, user_titles[$1], $2), user_messages = array_replace(user_messages, user_messages[$1], $3) WHERE id=$4', [req.params.articleIndex, req.body.title, req.body.message, req.user.id], (err) => {
                if (err) { throw err; }
                res.json('updated');
            })
        })
        .delete((req, res) => {
            pool.query('UPDATE sprout_users SET user_titles = array_remove(user_titles, user_titles[$1]), user_messages = array_remove(user_messages, user_messages[$1]), created_article_on = array_remove(created_article_on, created_article_on[$1]) WHERE id=$2', [req.params.articleIndex, req.user.id], (err) => {
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