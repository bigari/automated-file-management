import { observable, action, decorate } from "mobx";
import client from "../../client";

export class MemberStore {
  members = [];
  error = '';
  eid;
  constructor(root) {
    this.root = root;
  }

  addMember(eid, username) {
    this.error = ''  
    client.api
    .url(`/events/${eid}/members`)
    .post({
        username: username
    })
    .json(res => {
        this.members.push(res.member)
    })
    .catch(e => {
        this.error = JSON.parse(e.message).error
    });
  }

  fetchMembers(eid) {
    client.api
    .url(`/events/${eid}/members`)
    .get()
    .json(res => {
        this.members = res.members
    })
    .catch(e => {
        console.error(e.error);
    });  
  }
}

decorate(MemberStore, {
  members: observable,
  fetchMembers: action,
  addMember: action
});
