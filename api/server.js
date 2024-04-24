require('dotenv').config();
require('app-module-path').addPath(__dirname);

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit')

// Routers
const apiRouter = require('./routes/api/v1/index');
const userRouter = require('./routes/api/v1/users');

// App initialization
const app = express();

// Passport initialization
require('config/passport');

// Configure the rate limiter
const limiter = rateLimit({
    windowMs: 5*60*1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
})

// Connect to mongoDB via Mongoose
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(limiter);


if(process.env.NODE_ENV === 'production'){
    app.use(cors({
        origin: ""
    }));
} else {
    app.use(cors());
}
app.use(cors());

app.use('/api/v1/', apiRouter)
app.use('/api/v1/users', userRouter);

module.exports = app;
