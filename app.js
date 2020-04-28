var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var emorejiRoutes = require('./routes/emoreji');

var app = express();

const { argv } = require('yargs');
const { client_id, client_secret } = require('yargs').argv;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', emorejiRoutes);

module.exports = app;
