const WebSocket = require("ws");
const sendHttp = require("./http");
const wss = new WebSocket.Server({ port: 8080 });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

console.log("Starting realtime server");
wss.on("connection", (ws, req) => {
  console.log(`Incomming connection => ${req.connection.remoteAddress}`);
  ws.on("message", async message => {
    console.log(`Received message => ${message}`);

    const messageWrapper = JSON.parse(message);
    const responseQueue = [];
    for (const messageJson of messageWrapper.queue) {
      messageJson.jwt = messageWrapper.jwt;
      const res = await sendHttp(messageJson);
      responseQueue.push({
        url: messageJson.url,
        verb: messageJson.verb,
        data: res
      });
    }
    if (responseQueue.length > 0) {
      wss.broadcast(JSON.stringify(responseQueue));
    }
  });
});


