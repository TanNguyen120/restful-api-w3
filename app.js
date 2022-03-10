const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/category');
const actorRouter = require('./routes/actor');
const addressRouter = require('./routes/address');
const cityRouter = require('./routes/city');
const countryRouter = require('./routes/country');
const customerRouter = require('./routes/customer');
const filmRouter = require('./routes/film');
const filmActorRouter = require('./routes/filmActor');
const filmCategoryRouter = require('./routes/fimCategory');
const filmTextRouter = require('./routes/filmText');
const inventoryRouter = require('./routes/inventory');
const languageRouter = require('./routes/language');
const paymentRouter = require('./routes/payment');
const rentalRouter = require('./routes/rental');
const staffRouter = require('./routes/staff');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/actor', actorRouter);
app.use('/address', addressRouter);
app.use('/city', cityRouter);
app.use('/country', countryRouter);
app.use('/customer', customerRouter);
app.use('/film', filmRouter);
app.use('/filmActor', filmActorRouter);
app.use('/filmCategory', filmCategoryRouter);
app.use('/filmText', filmTextRouter);
app.use('/inventory', inventoryRouter);
app.use('/language', languageRouter);
app.use('./payment', paymentRouter);
app.use("./rental", rentalRouter);
app.use("./staff", staffRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
