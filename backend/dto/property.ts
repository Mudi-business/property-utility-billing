import { PropertyTypeEnum } from "../enums/property";
import { UtilityBillsResponseDto } from "./utilityBill";


//dto (Data Transfer Objects) for Properties
export interface PropertyRequestDto {
  property_name: string;
  property_address: string;
  property_type: PropertyTypeEnum;
}

export interface PropertyResponseWithBillsDto {
  property_id: string;
  property_name: string;
  property_address: string;
  property_type: PropertyTypeEnum;
  UtilityBills:UtilityBillsResponseDto[]
  createdAt: Date;
  updateAt: Date;
}

export interface PropertyResponseDto {
  property_id: string;
  property_name: string;
  property_address: string;
  property_type: PropertyTypeEnum;
  createdAt: Date;
  updateAt: Date;
}




export interface PropertyFindAndCountAll {
  count: number;
  rows: PropertyResponseDto[];
}
