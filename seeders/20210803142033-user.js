"use strict";
require("dotenv").config();
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const genPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    // await queryInterface.bulkInsert('users', [{
    //   email: 'admin@piggyb.com',
    //   password: genPassword,
    //   role: 'admin',
    //   is_active: 'yes'
    // }], {});
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkDelete('users', null, {});
  },
};
