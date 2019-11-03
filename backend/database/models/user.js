'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    username: { 
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    created_at: DataTypes.DATE
  }, {timestamps: false});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};