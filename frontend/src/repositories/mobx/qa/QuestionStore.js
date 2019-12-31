import { observable, action, decorate } from "mobx";
import client from "../../client";

export class QuestionStore {
  questions = []
  
  constructor(root) {
    this.root = root
  }

  fetchQuestions(eid) {
    client.api
      .url(`/events/${eid}/qas`)
      .get()
      .json(res => {
          this.questions = res.questions
      })
      .catch(error => {
        console.log(error);
      });
  }
}

decorate(QuestionStore, {
  questions: observable,
  fetchQuestions: action
});
