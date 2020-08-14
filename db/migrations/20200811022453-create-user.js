"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      group_code: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "groups",
          key: "code",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      level_code: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "levels",
          key: "code",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      main_level: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
      },
      remember_token: {
        type: Sequelize.STRING,
      },
      is_active: {
        type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updated_at",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
