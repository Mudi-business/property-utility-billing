"use-strict";
export {};
import { Model, UUIDV4 } from "sequelize";

//Initializing our Login Model with Sequelize
module.exports = (sequelize: any, DataTypes: any) => {
  class Logins extends Model {
    static associate(_: any) {}
  }

  Logins.init(
    {
      login_id: {
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      user_id: {
        allowNull: false,
        onDelete: "RESTRICT",
        type: DataTypes.UUID,
      },
      access_token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Logins",
    }
  );

  return Logins;
};
