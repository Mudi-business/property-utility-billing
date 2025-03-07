"use strict";
"use-strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const property_1 = require("../enums/property");
const helpers_1 = require("../utils/helpers");
module.exports = (sequelize, DataTypes) => {
    class Properties extends sequelize_1.Model {
        static associate(_) { }
    }
    Properties.init({
        property_id: {
            primaryKey: true,
            autoIncrement: false,
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
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
            type: DataTypes.ENUM((0, helpers_1.displaySwaggerEnumList)(property_1.PropertyTypeEnum)),
            allowNull: false,
        },
        created_by: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
        },
    }, {
        sequelize,
        modelName: "Properties",
    });
    return Properties;
};
//# sourceMappingURL=property.js.map