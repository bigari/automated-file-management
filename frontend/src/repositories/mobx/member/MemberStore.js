import { observable, action, decorate } from "mobx";
import client from "../../client";

export class MemberStore {
  members = [];
  error = "";
  eid;
  hasFetched = false;
  constructor(root) {
    this.root = root;
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
  error: observable,
  fetchMembers: action,
  addMember: action,
  deleteMember: action,
  setError: action
});
