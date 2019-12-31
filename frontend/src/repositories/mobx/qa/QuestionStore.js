import { observable, action, decorate } from "mobx";
import client from "../../client";

export class QuestionStore {
  questions = []
  
  constructor(root) {
    this.root = root;
    this.wss = root.webSocketService;
  }

  

  // initially get data directly from database
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

  /**
   * @param {int} qid 
   */
  deleteQuestion(qid) {
    const message = {
      verb: "DELETE",
      url: `questions/${qid}`,
      data: {}
    }
    this.wss.send(message)
  }

  /**
   * @param {int} qid 
   */
  deleteQuestionFromLocal(qid) {
    let i = 0
    for(const question of this.questions) {
      if(question.id == qid) {
        this.questions.splice(i, 1)
        return
      }
      i++
    }
  }

  /**
   * @param {string} question 
   */
  addQuestionToLocal(question) {
    this.questions.push(question);
  }
}

decorate(QuestionStore, {
  questions: observable,
  fetchQuestions: action,
  deleteLocalQuestion: action,
  addQuestionToLocal: action
});
