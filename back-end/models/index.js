"use strict";
const fs = require("fs");
const path = require("path");
const basename = path.basename(module.filename);
const sequelize = require("../connections");
const { Sequelize, DataTypes } = require("sequelize");

let db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    const returnFile =
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
    return returnFile;
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

console.log("checking", db);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
