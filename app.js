var express = require('express');
var path = require('path');
var http = require('http');
var config = require('./config');
var favicon = require('serve-favicon');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));
if (app.get('env') === 'development') {
    app.use(logger('dev'));
} else {
    app.use(logger('default'));
}
if ('development' === app.get('env')) {
    app.use(errorHandler());
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/send', function(req, res) {
    if (req.body.name === '' || req.body.email === '' || req.body.message === '') {
        res.send("Please fill all fields!");
        return false;
    }

    var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'longjustn@gmail.com',
            pass: config.get('password')
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var MailOptions = {
        from: 'info@reps.ai',
        to: 'mike@reps.ai',
        subject: 'Reps AI customer contact',
        text: req.body.name + ' ' + req.body.email + '\n' + req.body.message
    };
    smtpTransport.sendMail(MailOptions, function(error, response) {
        if (error) {

            res.send("Email could not be sent due to error:" + error);
        } else {
            res.send("Email has been sent");
        }

    });
});

http.createServer(app).listen(config.get('port'), function(){
    console.log('Express server listening on port ' + config.get('port'));
});

/*app.use(function(req, res, next) {
    if (req.url === '/') {
        res.render("index");
    } else {
        next();
    }
});

app.use(function(req, res, next) {
    if (req.url === '/terms') {
        res.render("terms");
    } else {
        next();
    }
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handler
app.use(function(err, req, res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});*/
/*


module.exports = app;*/
