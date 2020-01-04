"use strict";
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define(
    "Vote",
    {
      memberId: DataTypes.INTEGER,
      optionId: DataTypes.INTEGER,
      pollId: DataTypes.INTEGER
    },
    { timestamps: false }
  );
  Vote.associate = function(models) {
    // associations can be defined here
    Vote.belongsTo(models.Member, { foreignKey: "memberId", as: "member" });
    Vote.belongsTo(models.Option, { foreignKey: "optionId", as: "option" });
  };
  return Vote;
};
