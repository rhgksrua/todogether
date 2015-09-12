/*jslint node: true*/
'use strict';

var bcrypt = require('bcrypt-nodejs');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now},
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
