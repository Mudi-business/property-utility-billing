import { UtilityBillTypeEnum } from "../../enums/utilityBill";
import { displaySwaggerEnumList } from "../../utils/helpers";


export const requestUtilityBillSwaggerDto = {
    property_id: "uuid",
    utility_billing_amount: 0,
    utility_billing_type: { "@enum": displaySwaggerEnumList(UtilityBillTypeEnum) },
    utility_billing_date:"date",
};

export const responseUtilityBillSwaggerDto = {
    utility_billing_id: "uuid",
    property_id: "uuid",
    utility_billing_amount: 0,
    utility_billing_type: { "@enum": displaySwaggerEnumList(UtilityBillTypeEnum) },
    utility_billing_date:"date",
    createdAt: "date",
    updateAt: "date",
  };

export const responseUtilityBillsPageableSwaggerDto = {
  properties: [
    {
        utility_billing_id: "uuid",
        property_id: "uuid",
        utility_billing_amount: 0,
        utility_billing_type: { "@enum": displaySwaggerEnumList(UtilityBillTypeEnum) },
        utility_billing_date:"date",
        createdAt: "date",
        updateAt: "date",
    },
  ],
  totalItems: 0,
  totalPages: 0,
  pageNo: 0,
  pageSize: 0,
};

