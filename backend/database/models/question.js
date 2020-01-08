'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    content: {
      type: DataTypes.STRING,
      notNull: true
    },
    timestamp: {
      type: DataTypes.DATE,
      notNull: true
    },
    eid: {
      type: DataTypes.INTEGER,
      notNull: true
    },
    memberId: {
      type: DataTypes.INTEGER
    }
  }, {timestamps: false});
  Question.associate = function(models) {
    Question.belongsTo(models.Event, { foreignKey: "eid", as: "event"})
    Question.hasMany(models.Reply, { foreignKey: "qid", as: "replies" });
  };
  return Question;

};