'use strict';

const session        = require('express-session');
const passport       = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const pool           = require('./db');
const bcrypt         = require('bcrypt');
 
module.exports = (app) => {
  
    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({ 
        extended: true
    }));
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        //console.log('serialized user: ', user.rows[0]);
        done(null, user.rows[0]);
    });

    passport.deserializeUser((user, done) => {
        //console.log('deserialized user.id: ', user.id);
        done(null, user);
    });

    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }, (email, password, done) => {
            //console.log('auth: ', email, password);
            pool.query('SELECT id, first_name, last_name, user_email, user_pass, created_user_on, last_login FROM sprout_users WHERE user_email=($1)', [email], (err, data) => {
                if (err) { return done(err); }
                if (!data) { return done(null, false); }
                let user_pass = data.rows[0].user_pass;
                bcrypt.compare(password, user_pass, (err, res) => {
                    if (res) { return done(null, data); }
                    else { return done(null, false); }
                }) 
            });
        }
    ));
}