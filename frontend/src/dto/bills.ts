import { UtilityBillTypeEnum } from "~/enums/bill";

export interface BillPageableDto {
  pageNo: number;
  pageSize: number;
  bills: BillDto[];
  totalItems: number;
  totalPages: number;
}

export interface BillDto {
  utility_billing_id: string;
  property_id: string;
  utility_bill_amount: number;
  utility_bill_type: UtilityBillTypeEnum;
  utility_bill_date: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BillRequestDto {
  property_id: string;
  utility_bill_amount: number|string;
  utility_bill_type: UtilityBillTypeEnum | string;
  utility_bill_date: string;
}
