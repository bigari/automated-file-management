import { UserStore } from "./user/UserStore";
import { EventStore } from "./event/EventStore";
import WebSocketService from "../WebsocketService";
import { QuestionStore } from "./qa/QuestionStore";
import { MemberStore } from "./member/MemberStore";
import { PollStore } from "./poll/PollStore";

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.eventStore = new EventStore(this);
    this.webSocketService = new WebSocketService(this);
    this.questionStore = new QuestionStore(this);
    this.memberStore = new MemberStore(this);
    this.pollStore = new PollStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;
