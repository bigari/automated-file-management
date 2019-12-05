import { observable, action, computed, decorate, runInAction } from "mobx";
import client from "../../client";

export class EventStore {
  events;
  isLoading;
  root;
  constructor(root) {
    this.root = root;
    this.events = {};
    this.isLoading = {
      all: true,
      create: false
    };
  }

  get isCreating() {
    return this.isLoading.create;
  }

  get count() {
    return this.events.length;
  }

  get list() {
    return Object.values(this.events).sort((w1, w2) => {
      const d1 = Date.parse(w1.createdAt);
      const d2 = Date.parse(w2.createdAt);
      if (d1 < d2) {
        return 1;
      } else if (d1 === d2) {
        return 0;
      }
      return -1;
    });
  }

  create(eventData) {
    this.isLoading.create = true;
    return client.api
      .url("/events")
      .post({
        name: eventData.name,
        startAt: eventData.startAt,
        endAt: eventData.endAt
      })
      .json(json => {
        runInAction(() => {
          this.events[json.event.id] = json.event;
          this.isLoading.create = false;
        });
      });
  }

  fetchAll() {
    if (
      Object.keys(this.events).length === 0 &&
      this.events.constructor === Object
    ) {
      return client.api
        .url("/events")
        .get()
        .json(json => {
          runInAction(() => {
            this.events = {};
            json.events.forEach(event => {
              this.events[event.id] = event;
            });
            this.isLoading.all = false;
          });
        });
    }
  }
}

decorate(EventStore, {
  events: observable,
  fetchAll: action,
  create: action,
  count: computed,
  list: computed
});
