import { UserStore } from "./user/UserStore";
import { WorkspaceStore } from "./workspace/WorkspaceStore";

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.workspaceStore = new WorkspaceStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;
