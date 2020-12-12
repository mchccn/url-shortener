import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

try {
  (async () => {
    (await import("./urls")).default(sequelize, DataTypes);

    await sequelize.sync();

    console.log("Database synced");
    sequelize.close();
  })();
} catch (e) {
  console.error(e);
}
