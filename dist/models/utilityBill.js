"use strict";
"use-strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const helpers_1 = require("../utils/helpers");
const utilityBill_1 = require("../enums/utilityBill");
module.exports = (sequelize, DataTypes) => {
    class UtilityBills extends sequelize_1.Model {
        static associate(_) { }
    }
    UtilityBills.init({
        utility_bill_id: {
            primaryKey: true,
            autoIncrement: false,
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
        },
        property_id: {
            allowNull: false,
            onDelete: "RESTRICT",
            type: DataTypes.UUID,
        },
        utility_bill_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        utility_bill_type: {
            type: DataTypes.ENUM((0, helpers_1.displaySwaggerEnumList)(utilityBill_1.UtilityBillTypeEnum)),
            allowNull: false,
        },
        utility_bill_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        created_by: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
        },
    }, {
        sequelize,
        modelName: "UtilityBills",
    });
    return UtilityBills;
};
//# sourceMappingURL=utilityBill.js.map