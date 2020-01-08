const WebSocket = require("ws");
const sendHttp = require("./http");
const wss = new WebSocket.Server({ port: 8080 });
const cm = require("./channel");
const wreg = /^wsjoin::/;
console.log("Starting realtime server");

wss.on("connection", (ws, req) => {
  console.log(
    `Incomming connection => ${req.connection.remoteAddress} @ ${req.url}`
  );
  const channel = req.url;

  cm.attachToChannel(ws, channel);
  console.log(`Attached ${req.connection.remoteAddress} to ${req.url}`);
  //console.log(cm.channels);

  ws.on("message", async message => {
    console.log(`Received message => ${message}`);

    const messageWrapper = JSON.parse(message);
    const responseQueue = [];
    for (const messageJson of messageWrapper.queue) {
      let res;
      if (wreg.test(messageJson.url)) {
        res = messageJson;
        ws.joinUrl = messageJson.url;
      } else {
        messageJson.jwt = messageWrapper.jwt;
        messageJson.ajwt = messageWrapper.ajwt;
        res = await sendHttp(messageJson);
      }
      responseQueue.push({
        url: messageJson.url,
        verb: messageJson.verb,
        data: res
      });
    }
    if (responseQueue.length > 0) {
      const bcast = messageWrapper.bcast;
      if (bcast === undefined || bcast) {
        cm.globalBroadcast(channel, responseQueue);
      } else {
        ws.send(JSON.stringify(responseQueue));
      }
    }
  });

  ws.on("close", () => {
    cm.removeFromChannel(ws, channel);
    console.log(`Detached ${req.connection.remoteAddress} from ${req.url}`);
    // console.log(cm.channels);
  });
});
