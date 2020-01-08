import { observable, action, decorate } from "mobx";
import client from "../../client";

export class QuestionStore {
  qas = [];
  eid;
  hasFetched = false;

  constructor(root) {
    this.root = root;
    this.wss = root.webSocketService;
  }

  // initially get data directly from database
  fetchQuestions(eid) {
    if (!this.hasFetched) {
      client.api
        .url(`/events/${eid}/qas`)
        .get()
        .json(res => {
          this.qas = res.qas;
          this.hasFetched = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  /**
   * @param {int} qid 
   */
  deleteQuestion(qid) {
    const message = {
      verb: "DELETE",
      url: `questions/${qid}`,
      data: {eid: this.eid}
    }
    this.wss.send(message)
  }

  /**
   * @param {int} qid 
   */
  deleteQuestionFromLocal(qid) {
    let i = 0
    for(const question of this.qas) {                               
      if(question.id == qid) { 
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
        content: reply.trim(),
        eid: this.eid
      }
    }
    this.wss.send(message)  
  }

  addReplyToLocal(message) {
    // eslint-disable-next-line
    let i = 0
    for(const question of this.qas) {                               
      if(question.id == message.qid) {
        question.replies.push(message.reply)
        return
      }
      i++
    }
  }

  sendQuestion(question) {
    const message = {
      verb: "POST",
      url: `events/${this.eid}/qas`,
      data: {
        content: question,
        memberId: this.root.userStore.member.id
      }
    }
    
    this.wss.send(message)
  }
}

decorate(QuestionStore, {
  qas: observable,
  hasFetched: observable,
  fetchQuestions: action,
  deleteQuestionFromLocal: action,
  addQuestionToLocal: action,
  addReplyToLocal: action
});
