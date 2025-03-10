import { PropertyRequestDto } from "~/dto/property";
import { axiosInstance } from "../utils/functions/axiosInstance";

//PROPERTY SERVICES
export const GET_ALL_PROPERTIES = function <T>({
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
  const url = `/properties/pageable?page=${page}&size=${page_size}&search=${search}&filter=${filter}`;
  return axiosInstance.get<T>(url);
};

export const GET_PROPERTY_BY_ID = function (id: string) {
  const url = `/property/${id}`;
  return axiosInstance.get(url);
};

export const CREATE_PROPERTY = function (props: { data: PropertyRequestDto }) {
  const url = `/property`;
  return axiosInstance.post(url, props.data);
};
