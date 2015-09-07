// server.js

var express = require('express');
var app = express();
var dbconnection = require('./models/dbconnect');
var User = require('./models/SchemaTemplate');
var Todo = require('./models/Todo');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

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


app.post('/api/todo', function(req, res) {
    var todo = new Todo(req.body);
    todo.save(function(err, data) {
        if (err) {
            res.json({error: 'db error'});
            return console.log(err);
        }
        res.json('todo submitted');
        return console.log(data);
    });
});

app.get('/api/todo', function(req, res) {
    Todo.find().exec(function(err, todo) {
        if (err) {
            return res.json({err: 'db exec error'});
        }
        return res.json(todo);
    });
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://localhost:%d', port);
});
