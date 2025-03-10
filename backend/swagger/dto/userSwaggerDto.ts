
import {  getDateWithTime } from "../../utils/helpers";

// Since We use swagger-autogen for out Api Documentation that help us performing our Api Test easily
// Below we Initialize our User swagger DTO
export const requestUserSwaggerDto = {
  email: "string",
  first_name: "string",
  last_name: "string",
  address: "string",
  password: "string"
};

export const responseUserSwaggerDto = {
  user_id: "uuid",
  email: "string",
  first_name: "string",
  last_name: "string",
  address: "string",
  createdAt: `${getDateWithTime(new Date())}`,
  updateAt: `${getDateWithTime(new Date())}`,
};
