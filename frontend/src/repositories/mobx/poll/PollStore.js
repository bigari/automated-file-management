import { observable, action, decorate, computed } from "mobx";
import client from "../../client";

export class PollStore {
  polls = {};
  error = "";
  hasFetched = false;
  eid;
  constructor(root) {
    this.root = root;
    this.wss = root.webSocketService;
  }

  get list() {
    return Object.values(this.polls);
  }

  voteInServer(eid, pollId, optionId) {
    this.polls[pollId].choice = optionId
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

  fetchPolls(eventId) {
    if (!this.hasFetched) {
      client.api
        .url(`/events/${eventId}/polls`)
        .get()
        .json(({ polls }) => {
          const pollsObj = {};
          for (const poll of polls) {
            pollsObj[poll.id] = poll;
          }
          this.polls = pollsObj;

          this.hasFetched = true;
        })
        .catch(e => {
          console.error(e.error);
        });
    }
  }

  setError(error) {
    this.error = error;
  }
}

decorate(PollStore, {
  list: computed,
  hasFetched: observable,
  polls: observable,
  error: observable,
  fetchPolls: action,
  addPollToLocal: action,
  updatePollInLocal: action,
  deletePollFromLocal: action,
  voteInServer: action,
  voteInLocal: action,
  setError: action
});
