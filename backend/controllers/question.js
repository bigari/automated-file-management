const { Question } = require("../database/models/index");

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
    } 
}