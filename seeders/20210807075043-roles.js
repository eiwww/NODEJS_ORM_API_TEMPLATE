"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          name: "superadmin",
          displayName: "Super Admin",
        },
        {
          name: "factorymanager",
          displayName: "Factory Manager",
        },
        {
          name: "factoryuser",
          displayName: "Factory User",
        },
        {
          name: "inventorycentermanager",
          displayName: "Inventory Center Manager",
        },
        {
          name: "inventorycenteruser",
          displayName: "Inventory Center User",
        },
        {
          name: "branchmanager",
          displayName: "Branch manager",
        },
        {
          name: "branchuser",
          displayName: "Branch User",
        },
        {
          name: "franchisemanager",
          displayName: "Franchise manager",
        },
        {
          name: "franchiseuser",
          displayName: "Franchise User",
        },
        {
          name: "financemanager",
          displayName: "Finance manager",
        },
        {
          name: "financeuser",
          displayName: "Finance User",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
