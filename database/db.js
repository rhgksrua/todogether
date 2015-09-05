// db.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Todo Schema
 *
 * @return {undefined}
 */
var Todo = new Schema({
    user_id: String,
    content: String,
    created: Date,
    updated: Date,
});

mongoose.model('Todo', Todo);
mongoose.connect('mongodb://localhost/todogether');

var task = new Todo({
    user_id: '332',
    content: 'hey guy',
    created: Date.now(),
    updated: Date.now()
});

task.save(function(err, task) {
    if (err) {
        return console.log(err);
    }
    console.log(task);
});
