// db.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Todo Schema
 *
 * @return {undefined}
 */
var TodoSchema = new Schema({
    user_id: String,
    content: String,
    created: Date,
    updated: Date,
});

var Todo = mongoose.model('Todo', TodoSchema);
mongoose.connect('mongodb://localhost/todogether');

// everything below should be move outside this file 

var task = new Todo({
    user_id: '332',
    content: 'hey guy',
    created: Date.now(),
    updated: Date.now()
});

module.exports = function() {

    task.save(function(err, task) {
        if (err) {
            return console.log(err);
        }
        console.log(task);
    });
};
