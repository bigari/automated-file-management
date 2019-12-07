'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    content: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    eid: DataTypes.INTEGER
  }, {timestamps: false});
  Question.associate = function(models) {
    Question.hasMany(models.Reply, { foreignKey: "qid", as: "replies" });
    Question.belongsTo(models.Event, { foreignKey: "eid", as: "event" })
  };
  return Question;
};