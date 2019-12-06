'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    content: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    eid: DataTypes.INTEGER
  }, {});
  Question.associate = function(models) {
    Question.hasMany(models.Reply, { as: "Replies" });
    Question.belongsTo(models.Event, { foreignKey: "eid" })
  };
  return Question;
};