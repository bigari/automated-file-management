import { observable, action, decorate } from "mobx";
import client from "../../client";

export class QuestionStore {
  qas = []
  
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
          this.qas = res.qas
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
    for(const question of this.qas) {                               
      if(question.id === qid) {                                                                  
        this.qas.splice(i, 1)
        return
      }
      i++
    }
  }

  /**
   * @param {string} question 
   */
  addQuestionToLocal(question) {
    this.qas.push(question);
  }

  /**
   * @param {string} qid 
   * @param {string} reply 
   */
  sendReply(qid, reply) {
    const message = {
      verb: 'POST',
      url: `questions/${qid}/reply`,
      data: {
        content: reply.trim()
      }
    }
    this.wss.send(message)  
  }

  addReplyToLocal(message) {
    // eslint-disable-next-line
    let i = 0
    for(const question of this.qas) {                               
<<<<<<< HEAD
      if(question.id == message.qid) {
=======
      if(question.id === message.qid) {                                                                  
>>>>>>> 2eed2c457597a180b236ea7d5ef8dd501f2b3428
        question.replies.push(message.reply)
        return
      }
      i++
    }
  }
}

decorate(QuestionStore, {
  qas: observable,
  fetchQuestions: action,
  deleteQuestionFromLocal: action,
  addQuestionToLocal: action,
  addReplyToLocal: action
});
