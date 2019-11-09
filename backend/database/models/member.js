'use strict';
module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    userId: DataTypes.INTEGER,
    workspaceId: DataTypes.INTEGER,
    roleId: DataTypes.STRING
  }, {});
  Member.associate = function(models) {
    // associations can be defined here
    Member.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Member.belongsTo(models.Workspace, { foreignKey: "workspaceId", as: "workspace" });
  };
  return Member;
};