import { PropertyTypeEnum } from "../../enums/property";
import { displaySwaggerEnumList } from "../../utils/helpers";

export const requestPropertiesSwaggerDto = {
  property_name: "string",
  property_address: "string",
  property_type: { "@enum": displaySwaggerEnumList(PropertyTypeEnum) },
};

export const responsePropertySwaggerDto = {
    property_id: "string",
    property_name: "string",
    property_address: "string",
    property_type: { "@enum": displaySwaggerEnumList(PropertyTypeEnum) },
    createdAt: "date",
    updateAt: "date",
  };

export const responsePropertiesPageableSwaggerDto = {
  properties: [
    {
        property_id: "string",
        property_name: "string",
        property_address: "string",
        property_type: { "@enum": displaySwaggerEnumList(PropertyTypeEnum) },
        createdAt: "date",
        updateAt: "date",
    },
  ],
  totalItems: 0,
  totalPages: 0,
  pageNo: 0,
  pageSize: 0,
};

