'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    startAt: DataTypes.DATE,
    endAt: DataTypes.DATE,
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.hasMany(models.Question, { as: "questions" });
    Event.belongsTo(models.User, { foreignKey: "ownerId" });
  };
  return Event;
};
