import { observable, action, decorate, runInAction } from "mobx";
import client from "../../client";

export class QuestionStore {
  questions;

  fetchQuestions(eid) {
    console.log("Launching the request");
    client.api
      .url(`/event/${eid}/questions`)
      .get()
      .json(response => {
        runInAction(() => {
          this.questions = response;
          console.log(response);
        });
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
