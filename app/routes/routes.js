module.exports = function(app, passport) {
	
	// HOME PAGE
	app.get('/', function(req, res) {
		res.render('index.ejs', { user:req.user });
	});
	
	// REGISTER PAGE
	app.get('/register', function(req, res) {
		res.render('register.ejs', {
			message: req.flash('registerMessage'), 
			user : req.user 
		});	
	});
	
		// PROCESS THE REGISTRATION
		app.post('/register', passport.authenticate('local-registration', {
			successRedirect: '/edit',
			failureRedirect: '/register',
			failureFlash: true
		}));
	
	// LOGIN PAGE
	app.get('/login', function(req, res) {
		res.render('login.ejs', {
			message: req.flash('loginMessage'), 
			user : req.user 
		});	
	});
	
		// PROCESS THE LOGIN
		app.post('/login', passport.authenticate('local-login', {
			successRedirect: '/profile',
			failureRedirect: '/login',
			failureFlash: true
		}));
	
	// PROFILE PAGE
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user,
			ownerId : req.user._id,
		});
	});
	
	// EDIT PROFILE PAGE
	app.get('/edit', isLoggedIn, function(req, res) {
		res.render('editProfile.ejs', {
			user : req.user,
			message : req.flash('editMessage')
		});
	});
	
	// LOGOUT PAGE
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// Method to check if user is logged in
function isLoggedIn(req, res, next) {
	
	if(req.isAuthenticated()) {
		
		return next();
		
	} else {
		
		res.redirect('/');
		
	}
	
};




