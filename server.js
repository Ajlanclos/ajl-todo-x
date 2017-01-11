// Setup -- Required Tools
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var favicon = require('express-favicon');

var configDB = require('./config/database.js');


var app = express();

// MongoDB
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://Ajlanclos:Wh1te2014@ds161048.mlab.com:61048/heroku_q7wh2fg2');

require('./config/passport')(passport);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev')); // Logs every request to the console
app.use(bodyParser.urlencoded({
	'extended':'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
	type: 'application/vnd.api+json'
}));

app.use(methodOverride());
app.use(favicon(__dirname + '/public/favicon.ico'));

// Required for Passport
app.use(session({ secret: 'onegreatsecret' })); // Session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Configurations
app.set('view engine', 'ejs'); // Templating engine

// Use Routes
require('./app/routes/routes.js')(app, passport);
require('./app/routes/api.js')(app, passport);

app.listen(3000);
console.log("App listening on port 3000...");


module.exports = app;