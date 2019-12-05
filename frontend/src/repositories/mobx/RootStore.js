import { UserStore } from "./user/UserStore";
import { EventStore } from "./event/EventStore";
import WebSocketService from "../WebsocketService";

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.eventStore = new EventStore(this);
    this.webSocketService = new WebSocketService(this);
  }
}

const rootStore = new RootStore();

export default rootStore;
