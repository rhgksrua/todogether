// db.js
// DEPRECATED NEED TO REMOVE!!!!!!

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Todo Schema
 *
 * @return {undefined}
 */
var TodoSchema = new Schema({
    user_id: {type: Number, unique: true},
    content: String,
    created: {type: Date, default: Date.now },
    updated: Date
});

var Todo = mongoose.model('Todo', TodoSchema);
mongoose.connect('mongodb://localhost/todogether');

// everything below should be move outside this file 

var task = new Todo({
    user_id: '23',
    content: 'hey guy',
    //created: Date.now(),
    updated: Date.now()
});

module.exports = function() {

    task.save(function(err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    });
};
