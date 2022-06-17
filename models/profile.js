"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profile.init(
    {
      userId: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      gender: DataTypes.STRING,
      phone: DataTypes.STRING,
      provinceId: DataTypes.INTEGER,
      districtId: DataTypes.INTEGER,
      village: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      createdBy: DataTypes.UUID,
      updatedBy: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Profile",
      tableName: "profiles",
    }
  );

  return Profile;
};
