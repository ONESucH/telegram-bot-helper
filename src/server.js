const config = require('./config');
const express = require('express');
const telegram = require('telegram-bot-api');
const axios = require('axios');

const proxyList = [
  {host: 'intercluded.hotspotproxy.xyz', port: '443'},
  {host: 'exp.proxy.digitalresistance.dog', port: '443'},
  {host: 'mtprxz.duckdns.org', port: '443'},
  {host: 'sokolov.duckdns.org', port: '443'},
  {host: 'eager.289.signals.city', port: '443'},
  {host: 'eager.289.signals.city', port: '443'},
  {host: 'eager.289.signals.city', port: '443'},
  {host: 'eager.289.signals.city', port: '443'},
];

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
    host: '',
    port: ''
  }
};

/*api.getMe().then(res => {
  console.log('res', res);
});*/

const activeProxy = proxyList.filter(item => {
  urlConfig.proxy = {
    host: item.host,
    port: item.port
  };
  return axios.request(urlConfig).then(({data}) => data);
});

if (activeProxy) urlConfig.proxy = activeProxy[0];

app.use('/', (req, res, next) => {
  axios.request(urlConfig)
    .then(({data, body}) => {
      if (res.status === 200) {
        console.log('============================================');
        console.log(`=== Server connected success ${res.status}`);
        console.log('============================================\n');
      }
      console.log('body', body);
      res.send(data || 'Hello Telegram');
      res.end();
    })
    .catch(err => err)
});

app.listen(config.port, () => {
  console.log('===========================================================================');
  console.log('= For testing you need to create dedicated bot through BotFather');
  console.log(`=    BotName: ${config.botName}`);
  console.log(`=    TelegramApiKey: ${config.token}`);
  console.log(`=    TelegramChatId: ${config.chatId}`);
  console.log(`=    TelegramForwardMessageId: ${config.message_id}`);
  console.log(`=    ServerListenerOnPort: ${config.port}`);
  console.log(`=    ServerUrl: ${urlConfig.url}`);
  console.log(`=    ProxyHost: ${urlConfig.proxy.host}`);
  console.log(`=    ProxyPort: ${urlConfig.proxy.port}`);
  console.log('= ');
  console.log('= These environment variables are only needed for running "node server.js"');
  console.log('===========================================================================');
});
