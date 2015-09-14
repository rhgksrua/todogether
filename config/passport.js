/*jslint node:true */
'use strict';

/**
 * passport.js - passportjs middleware 
 * intercept request
 *
 * Register Users
 * Add users if email does not exists
 * 
 * @return {undefined}
 */


var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');

module.exports = function(passport) {
    passport.use('local-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({'email': email}, function(err, user) {
                // DB error
                if (err) {
                    return done(err);
                }
                // email exists
                if (user) {
                    return done(null, false);
                } else {
                    var newUser = new User();
                    newUser.email = email;
                    //newUser.password = newUser.generateHash(password);
                    newUser.password = password;
                    newUser.save(function(err, addedUser) {
                        // DB error
                        if (err) {
                            throw err;
                        }
                        return done(null, addedUser);
                    });
                }
            });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({'email': email}, function(err, user) {
                if (err) {
                    // DB error
                    return done(err);
                }
                console.log(user);

                if (!user) {
                    // user does not exist
                    return done(null, false);
                }

                if (user.validPassword(password)) {
                    // email exists check password
                    return done(null, user);

                } else {
                    // password does not match
                    return done(null, false);
                }
            });
        });
    }));
};

