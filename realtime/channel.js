const WebSocket = require("ws");
const redis = require("redis");

class ChannelManager {
  channels = {
    // "/channel1": [clients]
  };

  constructor() {
    this.sub = redis.createClient({ host: "redis", port: 6379 });
    this.pub = redis.createClient({ host: "redis", port: 6379 });

    this.sub.on("message", (channel, message) => {
      console.log(`Redis message received ${message}`);
      this.broadcast(channel, message);
    });
  }

  attachToChannel(ws, channel) {
    if (
      this.channels[channel] === undefined ||
      this.channels[channel].length === 0
    ) {
      this.channels[channel] = [ws];
      this.sub.subscribe(channel);
    } else {
      this.channels[channel].push(ws);
    }
  }

  removeFromChannel(ws, channel) {
    if (this.channels[channel] === undefined) {
      return;
    }
    this.channels[channel] = this.channels[channel].filter(
      client => client !== ws
    );
  //  cm.globalBroadcast(channel, [{ verb: "DELETE", url: ws.joinUrl }]);
    if (this.channels[channel].length === 0) {
      this.sub.unsubscribe(channel);
      console.log(`Redis unsuscribe from ${channel}`);
    }
  }

  broadcast(channel, message) {
    if (this.channels[channel] === undefined) {
      return;
    }
    for (const ws of this.channels[channel]) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    }
  }

  globalBroadcast(channel, jsonMessage) {
    this.pub.publish(channel, JSON.stringify(jsonMessage));
  }
}

const cm = new ChannelManager();
module.exports = cm;
