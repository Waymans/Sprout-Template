const session        = require('express-session');
const passport       = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const pool           = require('./db');
const bcrypt         = require('bcrypt');
 
module.exports = function (app) {
  
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        console.log('auth-seri: ', user);
        done(null, user.id);
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

    passport.use('local', new LocalStrategy(
        function(email, password, done) {
            console.log('auth: ', email, password);
            pool.query('SELECT user_pass FROM sprout_users WHERE user_email=($1)', [email], function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                bcrypt.compare(password, user.password, function(err, res) { 
                    if (res === true) { return done(null, user); }
                    else { return done(null, false); }
                }) 
            });
        }
    ));
  
    /*passport.use(new LocalStrategy(
        function(accessToken, refreshToken, profile, cb) {
            console.log('auth-init: ', profile);
            pool.query('INSERT INTO sprout_users (first_name, last_name, user_email, user_pass) VALUES ($1, $2, $3, $4)', [first, last, email, password], (err, result) => {
              if(err) {
                  console.log(err)
                  return cb(err)
              }
              if(result) {
                  cb(null, profile)
              } else {
                  cb(null, false)
              }
           })
        }
    ));*/
}