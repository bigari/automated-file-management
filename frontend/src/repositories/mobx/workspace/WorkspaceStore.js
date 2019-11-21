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
      all: true,
      create: false
    };
  }

  get isCreating() {
    return this.isLoading.create;
  }

  get count() {
    return this.workspaces.length;
  }
  get list() {
    return Object.values(this.workspaces).sort((w1, w2) => {
      const diffRole = w1.roleId - w2.roleId;
      if (diffRole === 0) {
        const d1 = Date.parse(w1.createdAt);
        const d2 = Date.parse(w2.createdAt);
        if (d1 < d2) {
          return 1;
        } else if (d1 === d2) {
          return 0;
        } else if (d1 > d2) {
          return -1;
        }
      }
      return diffRole;
    });
  }

  create(name) {
    this.isLoading.create = true;
    return client.api
      .url("/workspaces")
      .post({
        name: name
      })
      .json(json => {
        runInAction(() => {
          this.workspaces[json.workspace.id] = json.workspace;
          this.workspaces[json.workspace.id].roleId = 1;
          this.isLoading.create = false;
        });
      });
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
  create: action,
  count: computed,
  list: computed
});
