// server.js

var express = require('express');
var app = express();
var dbconnection = require('./models/dbconnect');
var User = require('./models/SchemaTemplate');

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.use(express.static('app'));

app.get('/notes', function(req, res) {
    var note = {
        title: 'Test note',
        description: 'Test body'
    };
    res.json(note);
});

// Creates a single entry of User.
app.get('/createentry', function(req, res) {
    var newUser = new User({});
    newUser.save(function(err, data) {
        if (err) {
            return console.log(err);
        }
        return console.log(data);
    });
    res.end();
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://localhost:%d', port);
});
