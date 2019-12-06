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
      this.sendQueue();
      console.log("[open] Connection established");
    };
    this.socket.onmessage = event => {
      //console.log(`[message] Data received from server: ${event.data}`);
      const messageQueue = JSON.parse(event.data);
      for (const message of messageQueue) {
        this.routeToStore(message);
      }
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

  sendQueue() {
    if (this.isOpen) {
      this.socket.send(
        JSON.stringify({
          jwt: this.root.userStore.user.jwt,
          queue: this.queue
        })
      );
      this.queue.length = 0;
    }
  }

  /** Enqueue a message and send the queue
   * @typedef {Object} Message
   * @property {String} verb - http verb
   * @property {String} url
   * @property {Object} data
   *
   * @param {Message} message
   *
   */
  send(message) {
    this.queue.push(message);
    this.sendQueue();
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
    if (resources.length <= 2) {
      ROUTES[resources[0]][message.verb]();
    } else if (resources.length <= 4) {
      ROUTES[resources[0]]["id"][resources[2]][message.verb]();
    }
  }
}
