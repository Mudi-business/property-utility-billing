import { UtilityBillTypeEnum } from "../../enums/utilityBill";
import {
  displaySwaggerEnumList,
  getDateWithoutTime,
  getDateWithTime,
} from "../../utils/helpers";

export const requestUtilityBillSwaggerDto = {
  property_id: "uuid",
  utility_bill_amount: 0,
  utility_bill_type: { "@enum": displaySwaggerEnumList(UtilityBillTypeEnum) },
  utility_bill_date: `${getDateWithoutTime(new Date())}`,
};

export const responseUtilityBillSwaggerDto = {
  utility_billing_id: "uuid",
  property_id: "uuid",
  utility_billing_amount: 0,
  utility_bill_type: { "@enum": displaySwaggerEnumList(UtilityBillTypeEnum) },
  utility_bill_date: `${getDateWithoutTime(new Date())}`,
  createdAt: `${getDateWithTime(new Date())}`,
  updateAt: `${getDateWithTime(new Date())}`,
};

export const responseUtilityBillsPageableSwaggerDto = {
  properties: [
    {
      utility_billing_id: "uuid",
      property_id: "uuid",
      utility_bill_amount: 0,
      utility_bill_type: {
        "@enum": displaySwaggerEnumList(UtilityBillTypeEnum),
      },
      utility_bill_date: `${getDateWithoutTime(new Date())}`,
      createdAt: `${getDateWithTime(new Date())}`,
      updateAt: `${getDateWithTime(new Date())}`,
    },
  ],
  totalItems: 0,
  totalPages: 0,
  pageNo: 0,
  pageSize: 0,
};
