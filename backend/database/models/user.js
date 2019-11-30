'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      notNull: true
    },
    username: { 
      type: DataTypes.STRING,
      unique: true,
      notNull: true
    },
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE
  }, {});
  
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Event, {
      foreignKey: "ownerId",
      as: "events"
    });
  };
  return User;
};