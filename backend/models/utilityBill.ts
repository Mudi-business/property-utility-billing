"use-strict";
export {};
import { Model, UUIDV4 } from "sequelize";
import { displaySwaggerEnumList } from "../utils/helpers";
import { UtilityBillTypeEnum } from "../enums/utilityBill";

module.exports = (sequelize: any, DataTypes: any) => {
  class UtilityBills extends Model {
    static associate(_: any) {}
  }

  UtilityBills.init(
    {
      utility_bill_id: {
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      property_id: {
        allowNull: false,
        onDelete: "RESTRICT",
        type: DataTypes.UUID,
      },
      utility_bill_amount: {
        type:DataTypes.DOUBLE,
        allowNull: false,
      },
      utility_bill_type: {
        type: DataTypes.ENUM(displaySwaggerEnumList(UtilityBillTypeEnum)),
        allowNull: false,
      },
      utility_bill_date:{
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
      modelName: "UtilityBills",
    }
  );

  return UtilityBills;
};