import { UtilityBillTypeEnum } from "../enums/utilityBill";

export interface UtilityBillRequestDto {
  property_id: string;
  utility_bill_amount: number;
  utility_bill_type: UtilityBillTypeEnum;
  utility_bill_date: Date;
}

export interface UtilityBillsResponseDto {
  utility_bill_id: string;
  property_id: string;
  utility_bill_amount: number;
  utility_bill_type: UtilityBillTypeEnum;
  utility_bill_date: Date;
  createdAt: Date;
  updateAt: Date;
}

export interface UtilityBillFindAndCountAll {
  count: number;
  rows: UtilityBillsResponseDto[];
}
