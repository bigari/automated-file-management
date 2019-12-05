export default class WebsocketService {
  socket;
  isOpen = false;
  constructor(rootStore) {
    this.root = rootStore;
  }
  queue = [];

  init() {
    if (this.isOpen) {
      return;
    }
    this.socket = new WebSocket("ws://localhost:5003");
    this.socket.onopen = event => {
      this.isOpen = true;
      while (this.queue.length > 0) {
        this.send(this.queue.shift());
      }
      console.log("[open] Connection established");
    };
    this.socket.onmessage = event => {
      //console.log(`[message] Data received from server: ${event.data}`);
      this.routeToStore(JSON.parse(event.data));
    };
    this.socket.onerror = error => {
      console.log(`[error] ${error.message}`);
    };
    this.socket.onclose = event => {
      this.isOpen = false;
      if (event.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log("[close] Connection died");
      }
    };
  }

  send(message) {
    if (this.isOpen) {
      this.socket.send(JSON.stringify(message));
    } else {
      this.queue.push(message);
    }
  }

  close() {
    if (this.isOpen) {
      this.socket.close();
      this.isOpen = false;
    }
  }

  routeToStore(message) {
    let resources = message.url.split("/");
    resources = resources.filter(res => res !== "");
    const ROUTES = {
      events: {
        id: {
          questions: {
            POST: () => {
              console.log(resources[1]);
            },
            PUT: () => {}
          }
        },
        GET: () => {
          console.log(message.data);
        },
        POST: () => {},
        PUT: () => {}
      }
    };
    switch (resources.length) {
      case 1:
        ROUTES[resources[0]][message.verb]();
        break;
      case 3:
        ROUTES[resources[0]]["id"][resources[2]][message.verb]();
        break;
      default:
        break;
    }
  }
}
