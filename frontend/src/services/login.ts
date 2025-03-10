import axios from "axios";
import { LoginRequestDto } from "../dto/login";
import { axiosInstance } from "../utils/functions/axiosInstance";


//LOGIN SERVICES
export const LOGIN_USER = function (props: { data: LoginRequestDto }) {
  const url = `${process.env.API_URL}/login`;
  return axios.post(url, props.data);
};

export const LOGOUT_USER = function (props: {user_id:string|null}) {
  const url = `/logout`;
  return axiosInstance.post(url, {user_id:props.user_id});
};
