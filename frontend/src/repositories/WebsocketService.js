export default class WebsocketService {
  socket;
  isOpen = false;
  constructor(rootStore) {
    this.root = rootStore;
  }
  queue = [];

  authParams() {
    const params = {};
    if (this.root.userStore.isLoggedIn) {
      params.jwt = this.root.userStore.user.jwt;
    }
    if (this.root.userStore.anonymousUser) {
      params.ajwt = this.root.userStore.anonymousUser.ajwt;
    }
    return params;
  }

  init(channelPath) {
    if (this.isOpen) {
      return;
    }
    this.socket = new WebSocket(`ws://localhost:5003/${channelPath}`);
    this.socket.onopen = event => {
      this.isOpen = true;
      this.sendQueue();
      console.log("[open] Connection established");
    };
    this.socket.onmessage = event => {
      console.log(`[message] Data received from server: ${event.data}`);
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
    if (this.isOpen && this.queue.length > 0) {
      this.socket.send(
        JSON.stringify({
          ...this.authParams(),
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
    if (message.url[0] === "/") {
      //Because superagent add the first /
      message.url = message.url.substring(1);
    }
    this.queue.push(message);
    this.sendQueue();
  }

  close() {
    if (this.isOpen) {
      this.socket.close();
      this.isOpen = false;
    }
  }

  /**
   * Routing elements
   */
  routeToStore(message) {
    let ids = message.url.match(/\d+/g);
    if (ids) {
      ids = ids.map(id => parseInt(id));
    }
    // With this, "/" terminated url won't work
    const ROUTES = {
      "events/\\d+": {
        GET: () => {
          console.log(message.data);
        }
      },

      "events/\\d+/qas": {
        POST: () => {
          const error = message.data.error;
          if (!error) {
            this.root.questionStore.addQuestionToLocal(message.data.question);
          } else {
            console.error(error);
          }
        },
        PUT: () => {}
      },

      "events/\\d+/polls": {
        POST: () => {
          this.root.pollStore.addPollToLocal(message.data.poll);
        }
      },

      "events/\\d+/polls/\\d+": {
        PUT: () => {
          this.root.pollStore.updatePollInLocal(message.data.poll);
        },
        DELETE: () => {
          this.root.pollStore.deletePollFromLocal(message.data.poll);
        }
      },

      "events/\\d+/polls/\\d+/vote": {
        POST: () => {
          this.root.pollStore.voteInLocal(
            ids[1], // pollId
            message.data.options
          );
        }
      },

      "questions/\\d+": {
        DELETE: () => {
          const qid = message.data.qid;
          const error = message.data.error;
          if (!error) {
            this.root.questionStore.deleteQuestionFromLocal(qid);
          } else {
            console.error(error);
          }
        }
      },

      "questions/\\d+/reply": {
        POST: () => {
          const error = message.data.error;
          if (!error) {
            this.root.questionStore.addReplyToLocal(message.data);
          } else {
            console.error(error);
          }
        }
      }
    };
    let reg;
    for (const pattern in ROUTES) {
      reg = new RegExp("^" + pattern + "$");
      if (reg.test(message.url)) {
        ROUTES[pattern][message.verb]();
        return;
      }
    }
  }
}
