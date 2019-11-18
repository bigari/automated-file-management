import { observable, action, computed, decorate, runInAction } from "mobx";
import client from "../../client";

export const ROLES = {
  "1": "owner",
  "2": "manager",
  "3": "member"
};

export class WorkspaceStore {
  workspaces;
  isLoading;
  root;
  constructor(root) {
    this.root = root;
    this.workspaces = {};
    this.isLoading = {
      all: true
    };
  }

  get count() {
    return this.workspaces.length;
  }
  get list() {
    return Object.values(this.workspaces).sort( (w1, w2) => w1.roleId-w2.roleId);
  }
  fetchAll() {
    if (
      Object.keys(this.workspaces).length === 0 &&
      this.workspaces.constructor === Object
    ) {
      return client.api
        .url("/workspaces")
        .get()
        .json(json => {
          runInAction(() => {
            this.workspaces = {};
            json.workspaces.forEach(workspace => {
              this.workspaces[workspace.id] = workspace;
            });
            this.isLoading.all = false;
          });
        });
    }
  }
}

decorate(WorkspaceStore, {
  workspaces: observable,
  fetchAll: action,
  count: computed,
  list: computed
});
