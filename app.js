require('dotenv').config();
const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const nconf = require('nconf');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// import routes
const index = require('./routes/index');

// import middleware
const notFoundHandler = require('./middleware/404');
const serverErrorHandler = require('./middleware/500');

// initialize app instance
const app = express();

// initialize configuration
nconf
  .env()
  .argv()
  .required(['PORT', 'MONGO_URL']);

// configuration setup
app.set('config', nconf);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// attach root url
app.use('/', index);

// catch 404 and forward to error handler
app.use(notFoundHandler);

// error handler
app.use(serverErrorHandler);

module.exports = app;
