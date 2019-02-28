var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var cons = require('consolidate');
var index = require('./routes/index');
const appInsights = require('applicationinsights');
appInsights.setup('95e0ad32-7e2a-4156-a5c4-4ebfca992dd6').start();
var app = express();

// view engine setup


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, './', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.engine('html', cons.swig)
app.set('dist', path.join(__dirname, 'dist'));
app.set('view engine', 'html');


app.use('/', index);
app.use(cors());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: err});
});

module.exports = app;
