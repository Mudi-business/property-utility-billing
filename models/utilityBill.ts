"use-strict";
export {};
import { Model, UUIDV4 } from "sequelize";
import { displaySwaggerEnumList } from "../utils/helpers";
import { UtilityBillTypeEnum } from "../enums/utilityBill";

module.exports = (sequelize: any, DataTypes: any) => {
  class UtilityBillings extends Model {
    static associate(_: any) {}
  }

  UtilityBillings.init(
    {
      utility_billing_id: {
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      property_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
      utility_billing_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      utility_billing_type: {
        type: DataTypes.ENUM(displaySwaggerEnumList(UtilityBillTypeEnum)),
        allowNull: false,
      },
      utility_billing_date:{
        type: DataTypes.DATE,
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
      modelName: "UtilityBillings",
    }
  );

  return UtilityBillings;
};