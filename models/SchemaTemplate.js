/** 
 * Mongoose Schema Template
 *
 * Use this file as a template to create more models
 * Schema is made into a model.
 *
 * Info on querying
 * http://mongoosejs.com/docs/queries.html
 *
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * 
 * Change the variable name 'UserSchema' to anything you want.
 * Change the schema according to your needs.
 *
 */
var UserSchema = new Schema({
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now},
    // Add more

});

// Required to create schema into a model
var User = mongoose.model('User', UserSchema);

module.exports = User;
