// todo
/*jslint node: true */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    content: {type: String, required: true},
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now},
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
