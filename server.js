// server.js

var express = require('express');
var app = express();
var db = require('./models/db');

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

app.get('/addtodb', function(req, res) {
    db();
    res.json({});
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://localhost:%d', port);
});
