import { BillRequestDto } from "../dto/bills";
import { axiosInstance } from "../utils/functions/axiosInstance";

//UTILIT BILL SERVICES
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
  const url = `/utility/bills/pageable?page=${page}&size=${page_size}`;
  return axiosInstance.get<T>(url);
};

export const GET_UTILITY_BILL_BY_ID = function (id: string) {
  const url = `/utility/bill/${id}`;
  return axiosInstance.get(url);
};

export const GET_UTILITY_BILL_BY_PROPERTY_ID = function (id: string) {
  const url = `/utility/bills/${id}`;
  return axiosInstance.get(url);
};


export const CREATE_UTILITY_BILLL = function (props: { data: BillRequestDto }) {
  const url = `/utility/bill`;
  return axiosInstance.post(url, props.data);
};