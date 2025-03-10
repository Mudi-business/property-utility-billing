"use-strict";
export {};
import { Model, UUIDV4 } from "sequelize";
const bcrypt =  require('bcryptjs');
const hashNo:any = process.env.PASSWORD_HASH;

//Initializing our User Model with Sequelize
module.exports = (sequelize: any, DataTypes: any) => {
  class Users extends Model {
    static associate(_: any) {}
  }

  Users.init(
    {
      user_id: {
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        set(value) {
          const hash = bcrypt.hashSync(value,parseInt(hashNo));
          this.setDataValue("password", hash);
        },
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );

  return Users;
};
