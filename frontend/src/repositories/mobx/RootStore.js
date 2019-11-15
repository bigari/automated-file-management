import { UserStore } from "./user/UserStore";
import { WorkspaceStore } from "./WorkspaceStore";

class RootStore {
  constructor() {
    this.userStore = new UserStore();
    this.workspaceStore = new WorkspaceStore();
  }
}

const rootStore = new RootStore();

export default rootStore;
