/**
 *
 * Connecting to mongodb using Mongoose ORM
 *
 * mongoose connects to the mongodb when the app starts.
 * Connection is closed when app is terminated.
 *
 * NOTE: dbUri might need to be moved to a config file
 *
 */
var mongoose = require('mongoose');
var dbUri = 'mongodb://localhost/todogether';

mongoose.connect(dbUri);

mongoose.connection.on('connected', function() {
    console.log('Mongoose connection: ' + dbUri);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose connection closed due to app termination');
        process.exit(0);
    });
});

