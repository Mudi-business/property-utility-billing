import axios from "axios";
import { BillRequestDto } from "../dto/bills";


export const GET_ALL_UTILITY_BILLS = function <T>({
  page,
  page_size,
  search,
  filter
}: {
  page: number;
  page_size: number;
  search:string;
  filter:string
}) {
  const url = `${process.env.API_URL}/utility/bills/pageable?page=${page}&size=${page_size}`;
  return axios.get<T>(url);
};

export const GET_UTILITY_BILL_BY_ID = function (id: string) {
  const url = `${process.env.API_URL}/utility/bill/${id}`;
  return axios.get(url);
};

export const CREATE_UTILITY_BILLL = function (props: { data: BillRequestDto }) {
  const url = `${process.env.API_URL}/utility/bill`;
  return axios.post(url, props.data);
};