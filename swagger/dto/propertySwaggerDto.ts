import { PropertyTypeEnum } from "../../enums/property";
import { displaySwaggerEnumList, getDateWithTime } from "../../utils/helpers";

export const requestPropertiesSwaggerDto = {
  property_name: "string",
  property_address: "string",
  property_type: { "@enum": displaySwaggerEnumList(PropertyTypeEnum) },
};

export const responsePropertySwaggerDto = {
    property_id: "uuid",
    property_name: "string",
    property_address: "string",
    property_type: { "@enum": displaySwaggerEnumList(PropertyTypeEnum) },
    createdAt: `${getDateWithTime(new Date())}`,
    updateAt: `${getDateWithTime(new Date())}`,
  };

export const responsePropertiesPageableSwaggerDto = {
  properties: [
    {
        property_id: "uuid",
        property_name: "string",
        property_address: "string",
        property_type: { "@enum": displaySwaggerEnumList(PropertyTypeEnum) },
        createdAt: `${getDateWithTime(new Date())}`,
        updateAt:`${getDateWithTime(new Date())}`,
    },
  ],
  totalItems: 0,
  totalPages: 0,
  pageNo: 0,
  pageSize: 0,
};

