var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')
var logger = require('morgan');
const mongoose = require("mongoose")
require("dotenv").config()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Established a connection to the database'))
  .catch(err => console.log('Something went wrong when connecting to the database ', err))
  console.log(process.env.MONGODB_URI)

var indexRouter = require('./routes/index');
const usersRouter = require('./routes/User/usersRouter')
const moviesRouter = require('./routes/Movie/moviesRouter')
const commentsRouter = require('./routes/Comment/commentsRouter')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter)
app.use('/movies', moviesRouter)
app.use('/comments', commentsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;