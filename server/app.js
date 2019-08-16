const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

const jobRouter = require('./routes/job');
const jobTypeRouter = require('./routes/jobType');
const historyRouter = require('./routes/history');

//mongodb
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/dashboard_db', {
    useNewUrlParser: true
});

//cors
const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use('/jobs', cors(corsOptions), jobRouter);
app.use('/history', cors(corsOptions), historyRouter);
app.use('/jobTypes', cors(corsOptions), jobTypeRouter);


app.use(logger('dev'));
app.use(express.json());
app.use(require('cors')());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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
