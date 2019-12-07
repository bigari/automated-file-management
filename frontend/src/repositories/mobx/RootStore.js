import { UserStore } from "./user/UserStore";
import { EventStore } from "./event/EventStore";
import WebSocketService from "../WebsocketService";
import { QuestionStore } from "./qa/QuestionStore";

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.eventStore = new EventStore(this);
    this.webSocketService = new WebSocketService(this);
    this.questionStore = new QuestionStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;
