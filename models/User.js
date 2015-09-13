/*jslint node: true*/
'use strict';

var bcrypt = require('bcrypt-nodejs');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SALT_WORK_FACTOR = 8;

var UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now},
});

UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });

});


/**
 * generateHash
 *
 * @param password - plain text password
 * @return {string} hashed password
 */
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * validPassword
 *
 * @param password - plain text password
 * @return {boolean} checks for valid password
 */
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
