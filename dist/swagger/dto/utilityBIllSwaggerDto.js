"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseUtilityBillsPageableSwaggerDto = exports.responseUtilityBillSwaggerDto = exports.requestUtilityBillSwaggerDto = void 0;
const utilityBill_1 = require("../../enums/utilityBill");
const helpers_1 = require("../../utils/helpers");
exports.requestUtilityBillSwaggerDto = {
    property_id: "uuid",
    utility_billing_amount: 0,
    utility_billing_type: { "@enum": (0, helpers_1.displaySwaggerEnumList)(utilityBill_1.UtilityBillTypeEnum) },
    utility_billing_date: "date",
};
exports.responseUtilityBillSwaggerDto = {
    utility_billing_id: "uuid",
    property_id: "uuid",
    utility_billing_amount: 0,
    utility_billing_type: { "@enum": (0, helpers_1.displaySwaggerEnumList)(utilityBill_1.UtilityBillTypeEnum) },
    utility_billing_date: "date",
    createdAt: "date",
    updateAt: "date",
};
exports.responseUtilityBillsPageableSwaggerDto = {
    properties: [
        {
            utility_billing_id: "uuid",
            property_id: "uuid",
            utility_billing_amount: 0,
            utility_billing_type: { "@enum": (0, helpers_1.displaySwaggerEnumList)(utilityBill_1.UtilityBillTypeEnum) },
            utility_billing_date: "date",
            createdAt: "date",
            updateAt: "date",
        },
    ],
    totalItems: 0,
    totalPages: 0,
    pageNo: 0,
    pageSize: 0,
};
//# sourceMappingURL=utilityBIllSwaggerDto.js.map