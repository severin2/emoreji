const { argv } = require('yargs');
const { BOT_TOKEN: botToken } = require('yargs').argv;

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')

const slackWebhookRoutes = require('./routes/slack-webhook')(botToken);

const app = express();
app.use(bodyParser.json())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/webhook', slackWebhookRoutes);
app.get('/', function(req, res, next) {
  res.status(200).send('holla at your boy (/¯–‿･)/¯');
});

module.exports = app;
