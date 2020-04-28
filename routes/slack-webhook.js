const { WebClient } = require('@slack/web-api');

const express = require('express');

module.exports = (botToken) => {
  const router = express.Router();

  const client = new WebClient(botToken)

  router.post('/', function(req, res, next) {

    const { user_id: userId } = req.body;
    if (!userId) {
      res.send(400).send('missing user_id');
      return;
    }

    client.reactions.list({
      user: userId
    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    })
  });

  return router;
};
