var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan'); // used to see requests
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })
var expressValidator = require('express-validator');
var app = express();
var config = require('./config');
app.set('view  engine', 'ejs'); // set up ejs for templating
app.set('strict routing',true);
app.set('case sensitive routing',true);
app.set('env','development');
app.enable('trust proxy');
app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/dataSource'));
app.use(morgan('dev'));

const subscriptionController=require('./controller/subscriptionController');

app.get('/newsletter',csrfProtection,function(req,res){

    res.render('./newsletter.ejs',{ csrfToken: req.csrfToken() });
});
app.post('/newsletter',parseForm, csrfProtection,subscriptionController.addEmail);
app.get('/error',function(req,res){

    res.render('./error.ejs');
});
app.listen(config.port);
console.log('Magic happens on port ' + config.port);