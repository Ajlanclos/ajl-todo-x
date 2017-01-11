var Todo = require('../models/todo.js');
var User = require('../models/user.js');

module.exports = function(app){
	
	/////////////
	// TODO APIs
	/////////////
		// Get all todos
		app.get('/api/todos', function(req, res, ownerId) {
			Todo.find({ownerId : req.user._id}, function(err, todos) {
				if(err) {
					res.send(err);
				}
				res.json(todos);
			});
		});

		// Create todos
		app.post('/api/todos', function(req, res, ownerId) {
			Todo.create({
				text: req.body.text,
				priority: req.body.priority,
				ownerId: req.user._id,
				done: false
			}, function(err, todo) {
				if(err) {
					res.send(err);
				}
				Todo.find({ownerId : req.user._id}, function(err, todos) {
					if(err) {
						res.send(err);
					}
					res.json(todos);
				});
			});
		});

		// Delete todos
		app.delete('/api/todos/:todo_id', function(req, res, ownerId) {
			Todo.remove({
				_id : req.params.todo_id
			}, function(err, todo) {
				if(err) {
					res.send(err);
				}
				Todo.find({ownerId : req.user._id}, function(err, todos) {
					if(err) {
						res.send(err);
					}
					res.json(todos);
				});
			});
		});
	
		
	
	/////////////
	// USER APIs
	/////////////
		// Get All Users
		app.get('/api/users', function(req, res) {
			User.find(function(err, users) {
				if(err) {
					res.send(err);
				}
				res.json(users);
			});
		});
	
		app.post('/edit', function(req, res, user) {
			User.update(req.user, {
				handle: req.body.handle,
				pic : req.body.pic,
				done : false
			}, function(err, users) {
				if(err) {
					res.send(err);
				} else {
					res.json(users);
				}
			});
		});
	
};