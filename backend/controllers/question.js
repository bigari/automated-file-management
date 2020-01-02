const { Question, Reply } = require("../database/models/index");

module.exports = {

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

    reply: async (req, res) => {
        try {
            const qid = req.params.qid
            let reply = req.body.reply
            reply = await Reply.create({
                content: reply,
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

    createQuestion: async (req, res) => {
        try {
            let question = req.body
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