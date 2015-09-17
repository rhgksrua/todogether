/*jslint node: true */
// server.js

var express = require('express');
var app = express();
var dbconnection = require('./models/dbconnect');
var User = require('./models/User');
var bodyParser = require('body-parser');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var ejwt= require('express-jwt')


require('./config/passport')(passport);

app.use(passport.initialize());

app.use(bodyParser.json());
app.use(express.static('app'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app/index.html');
});





app.post('/api/saveTodoList',ejwt({secret: 'pass'}), function(req, res) {
    User.findOne({'email': req.user.email}, function(err, user) {
        if (err) {
            // DB error
            return done(err);
        }
        console.log(user);

        if (!user) {
            // user does not exist
            return done(null, false);
        }else{
            user.todo=req.body;
        }

        user.save(function(err, data) {
            if (err) {
                res.json({error: 'db error'});
                return console.log(err);
            }
            res.json('todo submitted');
            return console.log(data);
        });


    });

});

app.get('/api/getTodoList',ejwt({secret: 'pass'}), function(req, res) {
    /*Todo.find().exec(function(err, todo) {
        if (err) {
            return res.json({err: 'db exec error'});
        }
        return res.json(todo);
    });*/
    User.find({
        email : req.body.email
    }).exec(function(err, data){
        if (err) {
            return res.json({err: 'db exec error'});
        }
        return res.json(data);

    });


    console.log("api get");
    /*console.log(req);
    var todoList = [
        {content: 'feed cats', done: false},
        {content: 'kick balls', done: false},
        {content: 'do nothing', done: false}
    ];
    res.json(todoList);*/
   // console.log(res);


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

app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {

        if (err) {
            // DB error
            res.json({error: 'db error'});
            return next(err);
        }

        console.log(' - db ok ');

        // passport.js done(null, false)
        // email in use
        if (!user) {
            console.log(' - log in failed');
            return res.json({error: 'login failed'});
        }

        // Generate jwt with user email
        // iat added by default
        // NOTE: need to change 'pass'
        var token = jwt.sign({
            email: user.email
        }, 'pass');
       // console.log(token)

        return res.json({token: token, email: user.email});
    })(req, res, next);
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://localhost:%d', port);
});
