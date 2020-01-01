'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   console.log("seeding users");
   await queryInterface.bulkInsert(
     "Users",
     [
       {
         id: 0,
         username: "anonymous",
         email: "anonymous@interconf.com",
         password: bcrypt.hashSync("010509", salt),
         createdAt: new Date()
       }
     ],
     {}
   );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", {"id":0}, {});
  }
};
