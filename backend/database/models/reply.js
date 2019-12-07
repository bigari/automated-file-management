'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    content: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    qid: DataTypes.INTEGER
  }, {timestamps: false});
  Reply.associate = function(models) {
    // associations can be defined here
    Reply.belongsTo(models.Question, { foreignKey: "qid", as: "question" })
  };
  return Reply;
};