var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var passport = require('passport');
//require('./auth/passport');
var Auth = require('./config/Auth')
var FileStore = require('session-file-store')(session);
var MailConfig = require('./config/MailConfig')
 
var fileStoreOptions = {};
 
// app.use(session({
//     store: new FileStore(fileStoreOptions),
//     secret: 'keyboard cat'
// }));





var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var countryRouter = require('./routes/country');
var stateCounter = require('./routes/state');
var districtCounter = require('./routes/district');
var policeStationCounter = require('./routes/policestation');
var postOfficeCounter = require('./routes/postoffice');
var villageCounter = require('./routes/village');
var signIn = require('./routes/signIn');
var signOut = require('./routes/signOut');
var auth = require('./routes/auth')

var cors = require('cors');
var app = express();
var mailer = require('express-mailer');
 
mailer.extend(app, MailConfig);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({
 // store: new FileStore(fileStoreOptions),
  secret: 'secret',
  httpOnly: false,
  resave: false,
  saveUninitialized: true
}));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true

}));

app.use(Auth);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/country', countryRouter);
app.use('/state', stateCounter);
app.use('/district', districtCounter);
app.use('/policestation', policeStationCounter);
app.use('/postoffice', postOfficeCounter);
app.use('/village', villageCounter);
app.use('/signin', signIn);
app.use('/signout', signOut);
app.use('/auth', passport.authenticate('jwt', {
  session: false
}), auth);

// app.get('/test', function (req, res) {
//   console.log(req.session)
//   console.log(req.headers)

//   if (req.session.page_views) {
//     req.session.page_views++;
//     res.send("You visited this page " + req.session.page_views + " times");
//   } else {
//     req.session.page_views = 1;
//     res.send("Welcome to this page for the first time!");
//   }
// });

app.get('/test', function (req, res) {
  // Setup email data.
  var mailOptions = {
    to: 'srimantaghosh02@gmail.com',
    subject: 'Email from SMTP sever',
    user: {  // data to view template, you can access as - user.name
      name: 'Srimanta Ghosh',
      message: 'Welcome to Krishi'
    }
  }
 
  // Send email.
  app.mailer.send('email', mailOptions, function (err, message) {
    if (err) {
      console.log(err);
      res.send('There was an error sending the email');
      return;
    }
    return res.send('Email has been sent!');
  });
 
});


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