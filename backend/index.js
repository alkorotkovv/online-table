const WebSocket = require('ws');

const wsServer = new WebSocket.Server({port: 3650});



wsServer.on('connection', onConnect);

console.log("66666666")


function onConnect(wsClient) {
    console.log('Новый пользователь');
    // отправка приветственного сообщения клиенту
    wsClient.send(JSON.stringify({action: "HELLO", content: {message: "PRIVET"}}));
  wsClient.on('message', function(message) {
      /* обработчик сообщений от клиента */
    })
  wsClient.on('close', function() {
      // отправка уведомления в консоль
      console.log('Пользователь отключился');
    })
  }