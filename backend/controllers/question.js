const { Question, Reply } = require("../database/models/index");

module.exports = {

    validateQuestion(question) {
        if(question.content === undefined || question.content.length === 0) throw new Error("A question can't be empty.")
        else if(question.content.length > 100) throw new Error(`The question is too long (${question.content.length} characters), 100 characters max.`)
    },
    
    validateReply(reply) {
        if(reply.content === undefined || reply.content.length === 0) throw new Error("A reply can't be empty.")
        else if(reply.content.length > 100) throw new Error(`The reply is too long (${reply.content.length} characters), 100 characters max.`)
    },

    fetchQuestions: async (req, res) => {
        try{
            const questions = await Question.findAll({
                where: {eid: req.params.eid}
            });
            
            const qas = await Promise.all(questions.map(async (question) => {
                let qa = question.dataValues
                let replies = await question.getReplies()
                qa.replies = replies.map(reply => reply.dataValues)
                return qa 
            }))

            res
            .status(200)
            .set("Content-Type", "application/json")
            .send({
                qas: qas
            });

        }catch(e) {
            res
            .status(500)
            .set("Content-Type", "application/json")
            .send({error: e.message})
        }
    },

    reply: async function(req, res) {
        try {
            let reply = req.body
            this.validateReply(reply)

            const qid = req.params.qid
            let content = req.body.content
            reply = await Reply.create({
                content: content,
                timestamp: new Date(),
                qid: qid
            })

            res
            .status(200)
            .set("Content-Type", "application/json")
            .send({
                qid: qid, 
                reply: reply
            })
        }
        catch(e) {
            res
            .status(500)
            .set("Content-Type", "application/json")
            .send({error: e.message})
        }
    },

    deleteQuestion: async (req, res) => {
        try {
            const qid = req.params.qid;
            await Question.destroy({
                where: {id: qid}
            });

            res.status(200)
            .set("Content-Type", "application/json")
            .send({
                qid: qid
            });
        }
        catch(e) {
            res
            .status(500)
            .set("Content-Type", "application/json")
            .send({error: e.message})
        }
    },

    createQuestion: async function(req, res) {
        try {
            let question = req.body
            this.validateQuestion(question)

            question = await Question.create({
                content: question.content,
                timestamp: new Date(),
                eid: req.params.eid
              });

            question.replies = []
            
            res.status(200)
            .set("Content-Type", "application/json")
            .send({question: question});
        }
        catch(e) {
            res
            .status(422)
            .set("Content-Type", "application/json")
            .send({error: e.message})
        }
    }  
}