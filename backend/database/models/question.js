'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    content: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    eid: DataTypes.INTEGER,
    reply: DataTypes.STRING
  }, {timestamps: false});
  Question.associate = function(models) {
    Question.belongsTo(models.Event, { foreignKey: "eid", as: "event" })
  };
  return Question;
};