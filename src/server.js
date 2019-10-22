const config = require('./config');
const express = require('express');
const telegram = require('telegram-bot-api');

const app = express();
const api = new telegram({
  token: config.token,
  updates: {enabled: true}
});
const url = `https://api.telegram.org/bot${config.token}/getMe`;
console.log(api); // <<-- Лежат методы отправок изображений, сообщений, редактирования и т.п.
console.log(url);

api.getMe().then(data => {
  console.log('----->>data', data);
})
  .catch((err) => {
    console.log('----->>err', err);
  });


api.on('message', (message) => {
  console.log('----->>message', message);
});

app.listen(config.port, () => {
  console.log('===========================================================================');
  console.log('= For testing you need to create dedicated bot through BotFather');
  console.log(`= Bot name: ${config.botName}`);
  console.log('= Export following environment variables:');
  console.log(`=    telegramApiKey: ${config.token}`);
  console.log(`=    telegramChatId: ${config.chatId}`);
  console.log(`=    telegramForwardMessageId: ${config.message_id}`);
  console.log('= ');
  console.log('= These environment variables are only needed for running "node server.js"');
  console.log('===========================================================================');
});
