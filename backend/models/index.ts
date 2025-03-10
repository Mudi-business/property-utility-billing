"use strict";
export {};

//Since we use Sequelize as our ORM(Object Relational Mapper)
//This is a root index file for our sequelize configurations
//Generated throught sequelize cli itself
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db: any = {};

let sequelize: any;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file: any) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file: any) => {    
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Our Models with their respective Relationships
db.Property = require("./property")(sequelize, DataTypes);
db.UtilityBill = require("./utilityBill")(sequelize, DataTypes);
db.User = require("./user")(sequelize,DataTypes)
db.Login = require("./login")(sequelize,DataTypes)

db.Property.hasMany(db.UtilityBill,{
  foreignKey: "property_id",
  as: "UtilityBills"
});

db.UtilityBill.belongsTo(db.Property,{
  foreignKey: "property_id",
  as: "Properties"
})

db.User.hasMany(db.Login,{
  foreignKey: "user_id",
  as: "Users"
});

db.Login.belongsTo(db.User,{
  foreignKey: "user_id",
  as: "Logins"
})


module.exports = db;
