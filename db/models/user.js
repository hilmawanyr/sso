"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      userid: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      group_code: DataTypes.STRING,
      level_code: DataTypes.STRING,
      main_level: DataTypes.STRING,
      email: DataTypes.STRING,
      remember_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.TINYINT,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
