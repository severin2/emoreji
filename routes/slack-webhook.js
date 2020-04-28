const { WebClient } = require('@slack/web-api');

const axios = require('axios');
const express = require('express');

module.exports = (botToken) => {
  const router = express.Router();

  const client = new WebClient(botToken);

  router.post('/', async function (req, res, next) {
    const { user_id: userId, response_url: responseUrl } = req.body;
    if (!userId) {
      res.send('missing user_id');
      return;
    }
    if (!responseUrl) {
      res.send('missing response_url');
      return;
    }

    res.send('one sec...');

    try {
      const result = await client.reactions.list({
        user: userId,
        full: true,
      });

      axios.post(responseUrl, {
        replace_original: 'true',
        text: `got a response! ${JSON.stringify(result)}`,
      });
    } catch (error) {
      axios.post(responseUrl, {
        replace_original: 'true',
        text: `got an error! ${JSON.stringify(error.message)}`,
      });
    }
  });

  return router;
};
