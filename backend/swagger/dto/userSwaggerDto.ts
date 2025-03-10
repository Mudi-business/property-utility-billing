
import {  getDateWithTime } from "../../utils/helpers";

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
