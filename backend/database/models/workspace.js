"use strict";
module.exports = (sequelize, DataTypes) => {
  const Workspace = sequelize.define(
    "Workspace",
    {
      ownerId: DataTypes.INTEGER,
      storageToken: DataTypes.STRING(512),
      storageProvider: DataTypes.STRING,
      name: DataTypes.STRING
    },
    {}
  );
  Workspace.associate = function(models) {
    // associations can be defined here
    Workspace.belongsTo(models.User, { foreignKey: "ownerId", as: "owner" });
    Workspace.hasMany(models.Member, {
      foreignKey: "workspaceId",
      as: "members"
    });
    Workspace.belongsToMany(models.User, {
      through: "Members",
      foreignKey: "workspaceId",
      as: "users"
    });
  };
  return Workspace;
};
