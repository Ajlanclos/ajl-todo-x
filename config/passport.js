var localStrategy = require('passport-local');
var User = require('../app/models/user');

module.exports = function(passport) {
	
	// Serialize/Deserialize the User's Session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
	
	passport.use('local-registration', new localStrategy ({
		
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
		
	},
	function(req, email, password, done) {
		process.nextTick(function() {
			User.findOne({'local.email' : email }, function(err, user) {
				// Check for err & return
				if(err) {
					return done(err);
				}
				// Check to see if the email already exist??
				if(user) {
					return done(null, false, req.flash('registerMessage', 'That email is already taken.'));
				} else {
					var newUser = new User(); // Create the user
					newUser.local.email = email; // Set the local user email
					newUser.local.password = newUser.generateHash(password); // Set the local user password/hashed
					
					newUser.save(function(err) {
						if(err) {
							throw err;
						}
						return done(null, newUser);
					});
				}
			});
		});
	}));
	
	passport.use('local-login', new localStrategy({
		
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		User.findOne({ 'local.email':email }, function(err, user) {
			if(err) {
				return done(err);
			}
			
			if(!user) {
				return done(null, false, req.flash('loginMessage', 'No User Found.'));
			}
			
			if(!user.validPassword(password)) {
				return done(null, false, req.flash('loginMessage', 'Oops! Wrong password! Try again...'));
			}
			
			return done(null, user);
		});		
	}));
};