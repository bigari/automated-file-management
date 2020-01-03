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
        console.log(this.error)
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

  setError(error) {
    this.error = error
  }
}

decorate(MemberStore, {
  members: observable,
  error: observable,
  fetchMembers: action,
  addMember: action,
  setError: action
});
