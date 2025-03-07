"use-strict";
export {};
import { Model, UUIDV4 } from "sequelize";
import { PropertyTypeEnum } from "../enums/property";
import { displaySwaggerEnumList } from "../utils/helpers";

module.exports = (sequelize: any, DataTypes: any) => {
  class Properties extends Model {
    static associate(_: any) {}
  }

  Properties.init(
    {
      property_id: {
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      property_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      property_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      property_type: {
        type: DataTypes.ENUM(displaySwaggerEnumList(PropertyTypeEnum)),
        allowNull: false,
      },

      created_by: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
    },
    {
      sequelize,
      modelName: "Properties",
    }
  );

  return Properties;
};
