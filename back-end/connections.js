"use strict";
const Sequelize = require("sequelize");
require("dotenv").config({ path: "./.env" });
const test = {
  host: process.env.MYSQL_DB,
  user: process.env.MYSQL_USER,
  pass: process.env.MYSQL_PASSWORD,
};
console.log(test);

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.error(`Database connected: ${process.env.MYSQL_DB}`);
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
