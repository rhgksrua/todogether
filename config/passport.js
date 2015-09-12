/*jslint node:true */
'use strict';

/**
 * passport.js - passportjs middleware 
 * intercept request
 *
 * Registers Users
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
                    newUser.password = newUser.generateHash(password);
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
};

