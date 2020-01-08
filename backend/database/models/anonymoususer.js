"use strict";
module.exports = (sequelize, DataTypes) => {
  const AnonymousUser = sequelize.define(
    "AnonymousUser",
    { createdAt: DataTypes.DATE },
    {timestamps: false}
  );
  AnonymousUser.associate = function(models) {
    // associations can be defined here
  };
  return AnonymousUser;
};
