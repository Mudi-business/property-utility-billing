import axios from "axios";
import { UserRequestDto } from "~/dto/user";


//USER SERVICES
export const CREATE_USER = function (props: { data: UserRequestDto }) {
    const url = `${process.env.API_URL}/user`;
    return axios.post(url, props.data);
  };