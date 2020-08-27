require('dotenv').config();
require('./configs/db.config')

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors')
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);



const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(
  session({
    secret: 'my-secret-weapon',
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000, //60 sec * 60 min * 24hrs = 1 day (in milliseconds)
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      //time to live (in seconds)
      ttl: 60 * 60 * 24,
      autoRemove: 'disabled',
    }),
  })
);

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
  credentials:true,
  origin: ['http://localhost:3000']
}))

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';



const auth = require('./routes/auth.routes');
app.use('/api', auth);


module.exports = app;
