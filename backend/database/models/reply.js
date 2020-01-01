'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    content: {
      notNull: true,
      type: DataTypes.STRING
    },
    timestamp: {
      notNull: true,
      type: DataTypes.DATE
    },
  }, {timestamps: false});
  Reply.associate = function(models) {
    Reply.belongsTo(models.Question, { foreignKey: "qid", as: "question" })
  };
  return Reply;
};