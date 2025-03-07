"use strict";
"use-strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const helpers_1 = require("../utils/helpers");
const utilityBill_1 = require("../enums/utilityBill");
module.exports = (sequelize, DataTypes) => {
    class UtilityBillings extends sequelize_1.Model {
        static associate(_) { }
    }
    UtilityBillings.init({
        utility_billing_id: {
            primaryKey: true,
            autoIncrement: false,
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
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
            type: DataTypes.ENUM((0, helpers_1.displaySwaggerEnumList)(utilityBill_1.UtilityBillTypeEnum)),
            allowNull: false,
        },
        utility_billing_date: {
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
        modelName: "UtilityBillings",
    });
    return UtilityBillings;
};
//# sourceMappingURL=utilityBill.js.map