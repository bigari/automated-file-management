import { observable, action, decorate, computed } from "mobx";
import client from "../../client";

export class MemberStore {
  members = [];
  participants = {};

  error = "";
  eid;
  hasFetched = false;
  constructor(root) {
    this.root = root;
  }

  get participantCount() {
    if (this.participants[this.eid]) {
      return this.participants[this.eid].size;
    }
    return 0;
  }

  addParticipant(eid, mid) {
    if (!this.participants[eid]) {
      this.participants[eid] = new Set();
    }
    this.participants[eid].add(mid);
  }

  addMember(eid, username) {
    this.error = "";
    client.api
      .url(`/events/${eid}/members`)
      .post({
        username: username
      })
      .json(res => {
        this.members.push(res.member);
      })
      .catch(e => {
        this.error = JSON.parse(e.message).error;
        console.log(this.error);
      });
  }

  deleteMember(uid) {
    client.api
      .url(`/events/${this.eid}/members/${uid}`)
      .delete()
      .json(res => {
        let i = 0;
        for (const member of this.members) {
          if (member.id == uid) {
            this.members.splice(i, 1);
            return;
          }
          i++;
        }
      })
      .catch(e => {
        this.error = JSON.parse(e.message).error;
        console.log(this.error);
      });
  }

  fetchMembers(eid) {
    if (!this.hasFetched) {
      client.api
        .url(`/events/${eid}/members`)
        .get()
        .json(res => {
          this.members = res.members;
          // if (res.participants != null) {
          // if (this.participants) {
          // this.participants[eid] = new Set([
          //   ...this.participants[eid],
          //   ...res.participants.map(p => p.id)
          // ]);
          // } else {
          this.participants[eid] = new Set(res.participants.map(p => p.id));
          //}

          console.log(this.participants);
          // }
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

decorate(MemberStore, {
  members: observable,
  participants: observable,
  participantCount: computed,
  addParticipant: action,
  error: observable,
  fetchMembers: action,
  addMember: action,
  deleteMember: action,
  setError: action
});
