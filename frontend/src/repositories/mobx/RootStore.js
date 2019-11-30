import { UserStore } from "./user/UserStore";
import { EventStore } from "./event/EventStore";

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.eventStore = new EventStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;
