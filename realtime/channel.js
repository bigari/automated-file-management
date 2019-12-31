const WebSocket = require("ws");

class ChannelManager {
  channels = {
    // "/channel1": [clients]
  };

  attachToChannel(ws, channel) {
    if (this.channels[channel] === undefined) {
      this.channels[channel] = [ws];
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
  }

  broadcast(channel, message) {
    if (this.channels[channel] === undefined) {
      return;
    }
    for (const ws of this.channels[channel]) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      }
    }
  }
}

const cm = new ChannelManager();
module.exports = cm;
