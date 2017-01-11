var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

// Todo Schema
var Todo = mongoose.model('Todo', {
	text: String,
	priority: String,
	ownerId: mongoose.Schema.Types.ObjectId
});

// Create Todo Model
module.exports = mongoose.model('Todo', Todo);