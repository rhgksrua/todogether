/*jslint node: true */
// server.js

var express = require('express');
var app = express();
var dbconnection = require('./models/dbconnect');
var Todo = require('./models/Todo');
var bodyParser = require('body-parser');
var passport = require('passport');
var jwt = require('jsonwebtoken');

require('./config/passport')(passport);

app.use(passport.initialize());

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

/**
 *  Register api endpoint
 *
 *  request json
 *  {
 *      email:    email,
 *      password: password
 *  }
 *
 *  reponse json
 *  success:
 *  {
 *      token: token,
 *      email: email
 *  }
 *  fail:
 *  db error
 *  {
 *      error: errormessage
 *  }
 *  email exists
 *  {
 *      exists: true
 *  }
 *          
 *
 * @return {undefined}
 */
app.post('/register', function(req, res, next) {
    // using custom callback for passport
    passport.authenticate('local-register', function(err, user, info) {
        // passport.js done(err)
        console.log(' - registering user ');
        if (err) {
            res.json({error: 'db error'});
            return next(err);
        }

        console.log(' - db ok ');

        // passport.js done(null, false)
        // email in use
        if (!user) {
            return res.json({exists: true});
        }

        console.log(' - email ok ');

        // Generate jwt with user email
        // iat added by default
        // NOTE: need to change 'pass'
        var token = jwt.sign({
            email: user.email
        }, 'pass');

        return res.json({token: token, email: user.email});
    })(req, res, next);
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://localhost:%d', port);
});
