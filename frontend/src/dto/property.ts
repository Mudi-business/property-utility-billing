import { PropertyTypeEnum } from "../enums/property";
import { BillDto } from "./bills";

export interface PropertyPageableDto {
  pageNo: number;
  pageSize: number;
  properties: PropertyDto[];
  totalItems: number;
  totalPages: number;
}

export interface PropertyDto {
  property_id: string;
  property_name: string;
  property_address: string;
  property_type: PropertyTypeEnum;
  createdAt: Date;
  updateAt: Date;
}

export interface PropertyResponseWithBillsDto {
  property_id: string;
  property_name: string;
  property_address: string;
  property_type: PropertyTypeEnum;
  UtilityBills:BillDto[]
  createdAt: Date;
  updateAt: Date;
}

export interface PropertyRequestDto {
  property_name: string;
  property_address: string;
  property_type: PropertyTypeEnum | string;
}
