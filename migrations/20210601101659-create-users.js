"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "users",
      {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
          collate: "utf8_bin",
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        // role: {
        //   allowNull: false,
        //   type: Sequelize.ENUM,
        //   values: [
        //     "god",
        //     "admin",
        //     "marketer",
        //     "agent",
        //     "manager",
        //     "accountant",
        //     "staff",
        //   ],
        //   defaultValue: "staff",
        // },
        isActive: {
          allowNull: false,
          type: Sequelize.ENUM,
          values: ["no", "yes"],
          defaultValue: "yes",
        },
        isDelete: {
          allowNull: false,
          type: Sequelize.ENUM,
          values: ["no", "yes"],
          defaultValue: "no",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("NOW"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("NOW"),
        },
      },
      {
        charset: "utf8",
        collate: "utf8_unicode_ci",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
