var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

const { config } = require('./config');
const router = require('./routes/routes');

var app = express();

//Configure all the settings.
app.use(bodyParser({extended: false}));
app.use(bodyParser.json());
app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/* ------------------------ DATABASE CONNECTION ------------------------ */
(async () => {
  try {
    connection = await mongoose.connect(config.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Succussfully connection to mongodb.. URL:' + config.mongo.uri)
  }
  catch (error) {
    console.log(error)
    process.exit(1);
  }
})();


// Handles trivial errors that are out of the scope of our APIs.
app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({error: err.message});
});

module.exports = app;
