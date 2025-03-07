"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseUtilityBillsPageableSwaggerDto = exports.responseUtilityBillSwaggerDto = exports.requestUtilityBillSwaggerDto = void 0;
const utilityBill_1 = require("../../enums/utilityBill");
const helpers_1 = require("../../utils/helpers");
exports.requestUtilityBillSwaggerDto = {
    property_id: "uuid",
    utility_bill_amount: 0,
    utility_bill_type: { "@enum": (0, helpers_1.displaySwaggerEnumList)(utilityBill_1.UtilityBillTypeEnum) },
    utility_bill_date: `${(0, helpers_1.getDateWithoutTime)(new Date())}`,
};
exports.responseUtilityBillSwaggerDto = {
    utility_billing_id: "uuid",
    property_id: "uuid",
    utility_billing_amount: 0,
    utility_bill_type: { "@enum": (0, helpers_1.displaySwaggerEnumList)(utilityBill_1.UtilityBillTypeEnum) },
    utility_bill_date: `${(0, helpers_1.getDateWithoutTime)(new Date())}`,
    createdAt: `${(0, helpers_1.getDateWithTime)(new Date())}`,
    updateAt: `${(0, helpers_1.getDateWithTime)(new Date())}`,
};
exports.responseUtilityBillsPageableSwaggerDto = {
    properties: [
        {
            utility_billing_id: "uuid",
            property_id: "uuid",
            utility_bill_amount: 0,
            utility_bill_type: {
                "@enum": (0, helpers_1.displaySwaggerEnumList)(utilityBill_1.UtilityBillTypeEnum),
            },
            utility_bill_date: `${(0, helpers_1.getDateWithoutTime)(new Date())}`,
            createdAt: `${(0, helpers_1.getDateWithTime)(new Date())}`,
            updateAt: `${(0, helpers_1.getDateWithTime)(new Date())}`,
        },
    ],
    totalItems: 0,
    totalPages: 0,
    pageNo: 0,
    pageSize: 0,
};
//# sourceMappingURL=utilityBIllSwaggerDto.js.map