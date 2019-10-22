const config = require('./config');
const express = require('express');
const telegram = require('telegram-bot-api');
const axios = require('axios');

const app = express();
const api = new telegram({
  token: config.token,
  updates: {enabled: false}
});
const urlConfig = {
  url: `https://api.telegram.org/bot${config.token}/getMe`,
  proxy: {
    host: '104.143.244.64',
    port: 443
  }
};

/*api.getMe().then(res => {
  console.log('res', res);
});*/

app.use('/', (req, res) => {
  axios.request(urlConfig)
    .then((res) => {
      console.log('res', res);
      console.log(res.status);
      if (res.status === 200) {
        console.log('===========================================================================');
        console.log('==== Proxy server connected');
        console.log('===========================================================================');
      }
    })
    .catch((err) => {
      if (!err.response) return console.log('Use next proxy');
    });

  res.send('Hello TELEGRAM');
});

app.listen(config.port, () => {
  console.log('===========================================================================');
  console.log('= For testing you need to create dedicated bot through BotFather');
  console.log(`=    Bot name: ${config.botName}`);
  console.log(`=    telegramApiKey: ${config.token}`);
  console.log(`=    telegramChatId: ${config.chatId}`);
  console.log(`=    telegramForwardMessageId: ${config.message_id}`);
  console.log(`=    server listener on port: ${config.port}`);
  console.log('= ');
  console.log('= These environment variables are only needed for running "node server.js"');
  console.log('===========================================================================');
});
