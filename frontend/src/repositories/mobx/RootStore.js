import { UserStore } from "./user/UserStore";

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;