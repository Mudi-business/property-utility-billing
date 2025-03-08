import { PropertyTypeEnum } from "../enums/property";

export interface PropertyPageableDto {
  pageNo: number;
  pageSize: number;
  properties: PropertyDto[];
  totalItems: number;
  totalPages: number;
}

export interface PropertyDto {
  createdAt: Date;
  created_by: string;
  property_address: string;
  property_id: string;
  property_name: string;
  property_type: PropertyTypeEnum;
  updatedAt: Date;
}

export interface PropertyRequestDto {
  property_name: string;
  property_address: string;
  property_type: PropertyTypeEnum | undefined;
}
