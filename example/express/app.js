var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var Route = require('../route')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',Route.connect(),function(req,res,next){
    if(req.routeResults){
        return res.json({'message':req.routeResults});
    }
    else{
        throw new Error('this is not supposed to happen')
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});


module.exports = app;
