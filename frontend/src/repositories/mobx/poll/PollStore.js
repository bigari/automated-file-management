import { observable, action, decorate, computed } from "mobx";
import client from "../../client";

export class PollStore {
  polls = {};
  error = "";
  eid;
  constructor(root) {
    this.root = root;
    this.wss = root.webSocketService;
  }

  get list() {
    return Object.values(this.polls);
  }

  voteInServer(eid, pollId, optionId) {
    this.wss.send({
      url: `/events/${eid}/polls/${pollId}/vote`,
      verb: "POST",
      data: { optionId: optionId }
    });
  }

  voteInLocal(pollId, option) {
    const options = this.polls[pollId].options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].id === option.id) {
        options[i] = option;
      }
    }
  }

  deletePollFromServer(eid, pollId) {
    this.wss.send({
      url: `/events/${eid}/polls/${pollId}`,
      verb: "DELETE",
      data: {}
    });
  }

  deletePollFromLocal(poll) {
    delete this.polls[poll.id];
  }

  //A poll update destroys all the options
  // ... and create some new
  updatePollInServer(eid, pollId, newPoll) {
    this.wss.send({
      url: `/events/${eid}/polls/${pollId}`,
      verb: "PUT",
      data: newPoll
    });
  }

  updatePollInLocal(poll) {
    this.polls[poll.id] = poll;
  }

  addPollToServer(eid, poll) {
    this.wss.send({
      url: `/events/${eid}/polls`,
      verb: "POST",
      data: poll
    });
  }

  addPollToLocal(poll) {
    if (poll) {
      this.polls[poll.id] = poll;
    }
  }

  fetchPolls(eid) {
    client.api
      .url(`/events/${eid}/polls`)
      .get()
      .json(({ polls }) => {
        this.polls = {};
        for (const poll of polls) {
          this.polls[poll.id] = poll;
        }
      })
      .catch(e => {
        console.error(e.error);
      });
  }

  setError(error) {
    this.error = error;
  }
}

decorate(PollStore, {
  list: computed,
  polls: observable,
  error: observable,
  fetchPolls: action,
  addPollToServer: action,
  addPollToLocal: action,
  updatePollInServer: action,
  updatePollInLocal: action,
  deletePollFromServer: action,
  deletePollFromLocal: action,
  voteInServer: action,
  voteInLocal: action,
  setError: action
});
