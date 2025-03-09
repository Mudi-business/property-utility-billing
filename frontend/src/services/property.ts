import axios from "axios";
import { PropertyRequestDto } from "~/dto/property";

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
  const url = `${process.env.API_URL}/properties/pageable?page=${page}&size=${page_size}&search=${search}&filter=${filter}`;
  return axios.get<T>(url);
};

export const GET_PROPERTY_BY_ID = function (id: string) {
  const url = `${process.env.API_URL}/property/${id}`;
  return axios.get(url);
};

export const CREATE_PROPERTY = function (props: { data: PropertyRequestDto }) {
  const url = `${process.env.API_URL}/property`;
  return axios.post(url, props.data);
};
