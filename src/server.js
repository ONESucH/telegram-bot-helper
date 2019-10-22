const config = require('./config');
const express = require('express');
const telegram = require('telegram-bot-api');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
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

app.use('/', (req, res, next) => {
  const body = axios.request(urlConfig)
    .then(result => result.data)
    .catch(err => !err.response && console.log('Use next proxy'));

  body.then(data => {
    res.send(data || 'Hello Telegram');
    next();
  });
});

app.listen(config.port, () => {
  console.log('===========================================================================');
  console.log('= For testing you need to create dedicated bot through BotFather');
  console.log(`=    Bot name: ${config.botName}`);
  console.log(`=    TelegramApiKey: ${config.token}`);
  console.log(`=    TelegramChatId: ${config.chatId}`);
  console.log(`=    TelegramForwardMessageId: ${config.message_id}`);
  console.log(`=    Server listener on port: ${config.port}`);
  console.log('= ');
  console.log('= These environment variables are only needed for running "node server.js"');
  console.log('===========================================================================');
});
