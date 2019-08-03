const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// mongo setup
const connectMongo = require('./mongo');
const router = require('./routes');
const routerUser = require('./routes/user');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const { ensureAuthenticated } = require('./config/auth');

//Passport Config
require('./config/passport')(passport);

const PORT = process.env.PORT || 5000;

const app = express();

// connectMongo
connectMongo();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Session middleware
app.use(
  session({
    secret: 'KiraAthenea',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// parse application/json
app.use(bodyParser.json());

// Config Routes
app.use('/', router);
app.use('/user', routerUser);
app.use('/data', ensureAuthenticated, (req, res) => {
  console.log('user', req.user);
  res.json({
    message: 'puede ver los datos',
    userName: req.user.name
  });
});

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`> API ready on localhost: ${PORT}`);
});
