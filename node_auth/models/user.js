var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

mongoose.connect("mongodb://localhost/node_auth/data/db");

var db = mongoose.connection;

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String,
		bcrypt: true,
		required: true // To be encrypted
	},
	email: {
		type: String
	},
	name: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {
	bcrypt.hash(newUser.password, 10, function (err, hash) {
		if (err) throw err;
		// Set hashed pw
		newUser.password = hash;
		// Create user
		newUser.save(callback);
	});
}
