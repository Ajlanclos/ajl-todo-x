var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// User Schema
var User = mongoose.Schema({

    local: {
        email: String,
        password: String,
    	},
	handle: String,
	pic: {data: Buffer, contentType: String}
});

// User Methods
	// Generate the HASH
	User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

	// Check is password is valid
	User.methods.validPassword = function(password) {
		return bcrypt.compareSync(password, this.local.password);
	};


// Create User Model
module.exports = mongoose.model('User', User);