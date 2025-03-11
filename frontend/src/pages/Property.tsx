import React, { useEffect, useState } from "react";
import { GET_ALL_PROPERTIES } from "../services/property";
import { PropertyDto, PropertyPageableDto } from "../dto/property";
import { useNavigate } from "react-router-dom";
import { AppCard } from "../utils/components/AppCard";
import { Pagination } from "../utils/components/Pagination";
import { calculatePaginatedNumber, ConvertSysDateToHumanDate, displayEnumList } from "../utils/helpers";
import { PropertyTypeEnum } from "../enums/property";

export const Property: React.FC = () => {
  const navigate = useNavigate();
  const [page,setPage] = useState<number>(0)
  const [properties, setProperties] = useState<PropertyPageableDto | undefined>(
    undefined
  );
  const initialForm = {
    search: "",
    filter: "",
    pageNo: 0,
    pageSize: 5,
    totalPages: 0,
    totalItems: 0,
  };
  const handliOnClickCancel = () => setFormFilters(initialForm);
  const [formDataFilters, setFormFilters] = React.useState<{
    search: string;
    filter: string;
    pageNo: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  }>(initialForm);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data: any = await GET_ALL_PROPERTIES({
          page: page,
          page_size: formDataFilters.pageSize,
          search: formDataFilters.search,
          filter: formDataFilters.filter,
        });

        const propertiesData: PropertyPageableDto = data.data;
        await setProperties(propertiesData);
     
        await setFormFilters((prev) => ({
          ...prev,
          pageNo: page,
          pageSize: propertiesData.pageSize,
          totalPages: propertiesData.totalPages,
          totalItems: propertiesData.totalItems,
        }));
      } catch (error) {
        // console.log("error :", error);
      }
    };
    fetchProperties();
  }, [formDataFilters.search, formDataFilters.filter,page,formDataFilters.pageSize]);


  

  return (
    <React.Fragment>
      <AppCard
        topStack={
          <div className="flex flex-row w-full gap-3">
            <button
              className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
            <button
              className="rounded-md bg-green-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={() => navigate("new/property")}
            >
              Add New Property
            </button>
          </div>
        }
        middleStack={
          <React.Fragment>
            <form>
              <div className="flex flex-row justify-start gap-5">
                <div className="w-full max-w-sm min-w-[200px]">
                  <div className="relative flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <input
                      value={formDataFilters?.search}
                      onChange={(event: any) => {
                        setFormFilters((prev) => ({
                          ...prev,
                          search: event.target.value,
                        }));
                      }}
                      className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      placeholder="Search by name or address..."
                    />
                  </div>
                </div>
                <div className="w-full max-w-sm min-w-[200px]">
                  <div className="relative">
                    <select
                      value={formDataFilters?.filter}
                      className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                      onChange={(event: any) => {
                        setFormFilters((prev) => ({
                          ...prev,
                          filter: event.target.value,
                        }));
                      }}
                    >
                      {["", ...displayEnumList(PropertyTypeEnum)].map(
                        (property, index) => {
                          return (
                            <option key={index} value={property}>
                              {property === ""
                                ? "Choose Property Type"
                                : property}
                            </option>
                          );
                        }
                      )}
                    </select>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.2"
                      stroke="currentColor"
                      className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      />
                    </svg>
                  </div>
                </div>
                <button
                  onClick={handliOnClickCancel}
                  className=" flex items-center rounded gap-2 bg-slate-700 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Clear
                </button>
              </div>
            </form>
            <div className="mt-3 relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
              <table className="w-full text-left table-auto min-w-max text-slate-800">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
                    <th className="p-4 bg-gray-100">
                      <p className="text-sm leading-none font-normal">S/N</p>
                    </th>
                    <th className="p-4 bg-gray-100">
                      <p className="text-sm leading-none font-normal">
                        Property Name
                      </p>
                    </th>
                    <th className="p-4 bg-gray-100">
                      <p className="text-sm leading-none font-normal">
                        Property Address
                      </p>
                    </th>
                    <th className="p-4 bg-gray-100">
                      <p className="text-sm leading-none font-normal">
                        Property Type
                      </p>
                    </th>
                    <th className="p-4 bg-gray-100">
                      <p className="text-sm leading-none font-normal">
                        Created Date
                      </p>
                    </th>
                    <th className="p-4 bg-gray-100">
                      <p className="text-sm leading-none font-normal">More</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {properties === undefined
                    ? []
                    : properties?.properties.map(
                        (property: PropertyDto, index: number) => (
                          <tr key={index} className="hover:bg-slate-50">
                            <td className="p-4  border-b border-slate-300 bg-slate-50">
                              <p className="text-sm font-bold">{calculatePaginatedNumber({
                                index:index,
                                pageNumber:page,
                                pageSize:formDataFilters.pageSize
                              })}</p>
                            </td>
                            <td className="p-4  border-b border-slate-300 bg-slate-50">
                              <p className="text-sm">
                                {property?.property_name}
                              </p>
                            </td>
                            <td className="p-4  border-b border-slate-300 bg-slate-50">
                              <p className="text-sm">
                                {property?.property_address}
                              </p>
                            </td>
                            <td className="p-4 border-b border-slate-300 bg-slate-50">
                              <p className="text-sm">
                                {property?.property_type}
                              </p>
                            </td>
                            <td className="p-4  border-b border-slate-300 bg-slate-50">
                              <p className="text-sm">
                                {ConvertSysDateToHumanDate(
                                  property?.createdAt.toString()
                                )}
                              </p>
                            </td>
                            <td className="p-4 border-b border-slate-300 bg-slate-50">
                              <a
                                role="button"
                                onClick={() =>
                                  navigate("utility/bills", {
                                    state: { data: property?.property_id },
                                  })
                                }
                                className="text-sm font-semibold text-slate-900 shadow-md p-3 "
                              >
                                Utility Bills
                              </a>
                            </td>
                          </tr>
                        )
                      )}
                </tbody>
              </table>
            </div>
          </React.Fragment>
        }
        bottomStack={
          <div className="flex flex-row justify-start gap-5">
            <Pagination
              handleBackButton={()=>{
                setPage((prev)=>prev-1)
              }}
              handleNextButton={()=>{
                setPage((prev)=>prev+1)
              }}
              pageNo={page}
              totalPage={formDataFilters.totalPages}
            />
            <div className=" max-w-sm min-w-[50px]">
              <div className="relative">
                <select
                  defaultValue={initialForm.pageSize}
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                  onChange={(event: any) => {
                    setFormFilters((prev) => ({
                      ...prev,
                      pageNo:0,
                      pageSize: event.target.value,
                    }));
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="150">150</option>
        
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.2"
                  stroke="currentColor"
                  className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </div>
            </div>
          </div>
        }
      />
    </React.Fragment>
  );
};
