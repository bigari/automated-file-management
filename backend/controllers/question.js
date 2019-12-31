const { Question } = require("../database/models/index");


const validateReply = function(req) {
    console.log(req.body)
}

module.exports = {
    fetchQuestions: async (req, res) => {
        try{
            const questions = await Question.findAll({
                where: {
                    eid: req.params.eid
                }
            });

            const jsonQuests = questions.map(question => {
                return question.dataValues
            })
            res
            .status(200)
            .set("Content-Type", "application/json")
            .send({
                questions: jsonQuests
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
            res.status(200)
            .set("Content-Type", "application/json")
            .send(req.body);
            // const qid = req.params.id
            // const reply = req.body.reply
            // const question = await Question.findOne(qid)

            // await question.update({
            //     reply: reply
            // })

            // res.status(200)
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
            //delete from database
            const qid = req.params.qid;
            console.log(qid)
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
                eid: req.params.eid,
                reply: ""
              });
            
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