"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responsePropertiesPageableSwaggerDto = exports.responsePropertySwaggerDto = exports.requestPropertiesSwaggerDto = void 0;
const property_1 = require("../../enums/property");
const helpers_1 = require("../../utils/helpers");
exports.requestPropertiesSwaggerDto = {
    property_name: "string",
    property_address: "string",
    property_type: { "@enum": (0, helpers_1.displaySwaggerEnumList)(property_1.PropertyTypeEnum) },
};
exports.responsePropertySwaggerDto = {
    property_id: "string",
    property_name: "string",
    property_address: "string",
    property_type: { "@enum": (0, helpers_1.displaySwaggerEnumList)(property_1.PropertyTypeEnum) },
    createdAt: "date",
    updateAt: "date",
};
exports.responsePropertiesPageableSwaggerDto = {
    properties: [
        {
            property_id: "string",
            property_name: "string",
            property_address: "string",
            property_type: { "@enum": (0, helpers_1.displaySwaggerEnumList)(property_1.PropertyTypeEnum) },
            createdAt: "date",
            updateAt: "date",
        },
    ],
    totalItems: 0,
    totalPages: 0,
    pageNo: 0,
    pageSize: 0,
};
//# sourceMappingURL=propertySwaggerDto.js.map