import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) =>
  sequelize.define("urls", {
    id: {
      type: dataTypes.STRING,
      primaryKey: true,
    },
    url: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    uses: {
      type: dataTypes.INTEGER,
      defaultValue: 0,
    },
    maxUses: {
      type: dataTypes.INTEGER,
      defaultValue: 10,
    },
  });
