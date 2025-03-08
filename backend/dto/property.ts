import { PropertyTypeEnum } from "../enums/property";

export interface PropertyRequestDto {
  property_name: string;
  property_address: string;
  property_type: PropertyTypeEnum;
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
