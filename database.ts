import { DataTypes, Sequelize } from "sequelize";
import * as database from "./urls";

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

const urls = database.default(sequelize, DataTypes);

export { urls };
